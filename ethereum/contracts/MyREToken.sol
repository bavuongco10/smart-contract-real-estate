pragma solidity ^0.4.25;

contract AccessControl {
    /// @dev The addresses of the accounts (or contracts) that can execute actions within each roles
    address public ceoAddress;
    address public cooAddress;
    address[] public appointedApprovers;

    /// @dev Keeps track whether the contract is paused. When that is true, most actions are blocked
    bool public paused = false;

    /// @dev The AccessControl constructor sets the original C roles of the contract to the sender account
    function AccessControl() public {
        ceoAddress = msg.sender;
        cooAddress = msg.sender;
    }

    /// @dev Access modifier for CEO-only functionality
    modifier onlyCEO() {
        require(msg.sender == ceoAddress);
        _;
    }

    /// @dev Access modifier for COO-only functionality
    modifier onlyCOO() {
        require(msg.sender == cooAddress);
        _;
    }

    /// @dev Access modifier for any CLevel functionality
    modifier onlyCLevel() {
        require(msg.sender == ceoAddress || msg.sender == cooAddress);
        _;
    }

    /// @dev Assigns a new address to act as the CEO. Only available to the current CEO
    /// @param _newCEO The address of the new CEO
    function setCEO(address _newCEO) public onlyCEO {
        require(_newCEO != address(0));
        ceoAddress = _newCEO;
    }

    /// @dev Assigns a new address to act as the COO. Only available to the current CEO
    /// @param _newCOO The address of the new COO
    function setCOO(address _newCOO) public onlyCEO {
        require(_newCOO != address(0));
        cooAddress = _newCOO;
    }

    function addApprover(address approver) public onlyCEO {
        appointedApprovers.push(approver);
    }

    /// @dev Modifier to allow actions only when the contract IS NOT paused
    modifier whenNotPaused() {
        require(!paused);
        _;
    }

    /// @dev Modifier to allow actions only when the contract IS paused
    modifier whenPaused {
        require(paused);
        _;
    }

    /// @dev Pause the smart contract. Only can be called by the CEO
    function pause() public onlyCEO whenNotPaused {
        paused = true;
    }

    /// @dev Unpauses the smart contract. Only can be called by the CEO
    function unpause() public onlyCEO whenPaused {
        paused = false;
    }
}

/**
 * Interface for required functionality in the ERC721 standard
 * for non-fungible tokens.
 *
 * https://github.com/ethereum/EIPs/blob/master/EIPS/eip-721.md
 */
contract ERC721 {
    // Events
    event Transfer(address indexed _from, address indexed _to, uint256 _tokenId);
    event Approval(address indexed _owner, address indexed _approved, uint256 _tokenId);

    /// For querying totalSupply of token.
    function totalSupply() public view returns (uint256 _totalSupply);

    /// For querying balance of a particular account.
    /// @param _owner The address for balance query.
    /// @dev Required for ERC-721 compliance.
    function balanceOf(address _owner) public view returns (uint256 _balance);

    /// For querying owner of token.
    /// @param _tokenId The tokenID for owner inquiry.
    /// @dev Required for ERC-721 compliance.
    function ownerOf(uint256 _tokenId) public view returns (address _owner);

    /// @notice Grant another address the right to transfer token via takeOwnership() and transferFrom()
    /// @param _to The address to be granted transfer approval. Pass address(0) to
    ///  clear all approvals.
    /// @param _tokenId The ID of the Token that can be transferred if this call succeeds.
    /// @dev Required for ERC-721 compliance.
    function approve(address _to, uint256 _tokenId) public;

    // NOT IMPLEMENTED
    // function getApproved(uint256 _tokenId) public view returns (address _approved);

    /// Third-party initiates transfer of token from address _from to address _to.
    /// @param _from The address for the token to be transferred from.
    /// @param _to The address for the token to be transferred to.
    /// @param _tokenId The ID of the Token that can be transferred if this call succeeds.
    /// @dev Required for ERC-721 compliance.
    function transferFrom(address _from, address _to, uint256 _tokenId) public;

    /// Owner initates the transfer of the token to another account.
    /// @param _to The address of the recipient, can be a user or contract.
    /// @param _tokenId The ID of the token to transfer.
    /// @dev Required for ERC-721 compliance.
    function transfer(address _to, uint256 _tokenId) public;

    ///
    function implementsERC721() public view returns (bool _implementsERC721);

    // EXTRA
    /// @notice Allow pre-approved user to take ownership of a token.
    /// @param _tokenId The ID of the token that can be transferred if this call succeeds.
    /// @dev Required for ERC-721 compliance.
    function takeOwnership(uint256 _tokenId) public;
}

contract DetailedERC721 is ERC721 {
    function name() public view returns (string _name);
    function symbol() public view returns (string _symbol);
}

contract MyREToken is AccessControl, DetailedERC721 {
    using SafeMath for uint256;

    mapping(uint256 => address) private tokenIdToOwner;
    mapping (uint256 => uint256) private tokenIdToPrice;
    mapping(address => uint256) private ownershipTokenCount;
    mapping(uint256 => address) private tokenIdToApproved;
    mapping (uint256 => uint256) private transferIdToPaid;


    struct RealEstate {
        bytes32 dataHash;
    }

    bool private erc721Enabled = false;

    modifier onlyERC721() {
        require(erc721Enabled);
        _;
    }

    struct RegisterRequest {
        address owner;
        bytes32 dataHash;
        bool complete;
        uint256 approversCount;
        mapping(address => bool) approvers;
        uint256 approvalsCount;
        mapping(address => bool) approvals;
    }

    struct TransferRequest {
        address from;
        bool complete;
        address to;
        uint256 tokenId;
        uint256 price;
        uint256 approversCount;
        mapping(address => bool) approvers;
        uint256 approvalsCount;
        mapping(address => bool) approvals;
    }

    RealEstate[] private realEstates;
    RegisterRequest[] public registerRequests;
    TransferRequest[] public transferRequests;

    function createRegisterRequest(bytes32 dataHash) public {
        RegisterRequest memory newRequest = RegisterRequest({
            owner : msg.sender,
            dataHash : dataHash,
            complete : false,
            approversCount : appointedApprovers.length,
            approvalsCount : 0
        });

        uint256 newTokenIndex = registerRequests.push(newRequest) - 1;
        RegisterRequest storage currentRequest = registerRequests[newTokenIndex];
        for (uint256 i = 0; i < appointedApprovers.length; i++) {
            currentRequest.approvers[appointedApprovers[i]] = true;
        }
    }

    function approveRegisterRequest(uint256 index) public {
        RegisterRequest storage request = registerRequests[index];

        require(request.approvers[msg.sender]);
        require(!request.approvals[msg.sender]);

        request.approvals[msg.sender] = true;
        request.approvalsCount++;
    }

    function finalizeRegisterRequest(uint256 index) public {
        RegisterRequest storage request = registerRequests[index];

        require(request.approvalsCount > (request.approversCount / 2));
        require(!request.complete);

        request.complete = true;
    }

    event TokenCreated(uint256 tokenId, bytes32 dataHash, address owner);

    function finalizeRegisterRealEstate(uint256 index) {
        finalizeRegisterRequest(index);
        RegisterRequest memory request = registerRequests[index];
        _createToken(request.dataHash, request.owner);
    }

    function createTransferRequest(address to, uint256 tokenId, uint price) public {
        require(_to != address(0));
        require(_owns(msg.sender, _tokenId));

        TransferRequest memory newRequest = TransferRequest({
            from : msg.sender,
            complete : false,
            to : to,
            price: price,
            tokenId: tokenId,
            approversCount : appointedApprovers.length,
            approvalsCount : 0
            });

        uint256 newTokenIndex = transferRequests.push(newRequest) - 1;
        TransferRequest storage currentRequest = transferRequests[newTokenIndex];
        for (uint256 i = 0; i < appointedApprovers.length; i++) {
            currentRequest.approvers[appointedApprovers[i]] = true;
        }
    }

    function approveTransferRequest(uint256 index) public {
        TransferRequest storage request = transferRequests[index];

        require(request.approvers[msg.sender]);
        require(!request.approvals[msg.sender]);

        request.approvals[msg.sender] = true;
        request.approvalsCount++;
    }

    function finalizeTransferRequest(uint256 index) public {
        TransferRequest storage request = transferRequests[index];

        require(request.approvalsCount > (request.approversCount / 2));
        require(!request.complete);

        request.complete = true;
    }

    function finalizeTransferRealEstate(uint256 index) {
        finalizeTransferRequest(index);
        TransferRequest memory request = transferRequests[index];
        request.from.transfer(request.price);
        _transfer(request.from, request.to, request.tokenId);
    }

    function payTransfer(uint256 transferId) public payable  {
        TransferRequest storage request = transferRequests[transferId];
        require(request.price > 0);
        require(!request.complete);
        require(!transferIdToPaid[transferId]);
        require(msg.value >= request.price);

        transferIdToPaid[transferId] = true;
    }


    function _createToken(bytes32 _dataHash, address _owner) private {
        RealEstate memory _item = RealEstate({
            dataHash : _dataHash
            });
        uint256 newTokenId = realEstates.push(_item) - 1;

        emit TokenCreated(newTokenId, _dataHash, _owner);

        _transfer(address(0), _owner, newTokenId);
    }

    function getToken(uint256 _tokenId) public view returns (
        bytes32 _dataHash,
        address _owner
    ) {
        _dataHash = realEstates[_tokenId].dataHash;
        _owner = tokenIdToOwner[_tokenId];
    }

    function getAllTokens() public view returns (
        address[]
    ) {
        uint256 total = totalSupply();
        address[] memory owners = new address[](total);

        for (uint256 i = 0; i < total; i++) {
            owners[i] = tokenIdToOwner[i];
        }

        return (owners);
    }

    function tokensOf(address _owner) public view returns (uint256[]) {
        uint256 tokenCount = balanceOf(_owner);
        if (tokenCount == 0) {
            return new uint256[](0);
        } else {
            uint256[] memory result = new uint256[](tokenCount);
            uint256 total = totalSupply();
            uint256 resultIndex = 0;

            for (uint256 i = 0; i < total; i++) {
                if (tokenIdToOwner[i] == _owner) {
                    result[resultIndex] = i;
                    resultIndex++;
                }
            }
            return result;
        }
    }

    function enableERC721() public onlyCEO {
        erc721Enabled = true;
    }

    function totalSupply() public view returns (uint256 _totalSupply) {
        _totalSupply = realEstates.length;
    }

    function balanceOf(address _owner) public view returns (uint256 _balance) {
        _balance = ownershipTokenCount[_owner];
    }

    function ownerOf(uint256 _tokenId) public view returns (address _owner) {
        _owner = tokenIdToOwner[_tokenId];
    }

    function approve(address _to, uint256 _tokenId) public whenNotPaused onlyERC721 {
        require(_owns(msg.sender, _tokenId));
        tokenIdToApproved[_tokenId] = _to;
        Approval(msg.sender, _to, _tokenId);
    }

    function transferFrom(address _from, address _to, uint256 _tokenId) public whenNotPaused onlyERC721 {
        require(_to != address(0));
        require(_owns(_from, _tokenId));
        require(_approved(msg.sender, _tokenId));

        _transfer(_from, _to, _tokenId);
    }

    function transfer(address _to, uint256 _tokenId) public whenNotPaused onlyERC721 {
        require(_to != address(0));
        require(_owns(msg.sender, _tokenId));

        _transfer(msg.sender, _to, _tokenId);
    }

    function implementsERC721() public view whenNotPaused returns (bool) {
        return erc721Enabled;
    }

    function takeOwnership(uint256 _tokenId) public whenNotPaused onlyERC721 {
        require(_approved(msg.sender, _tokenId));
        _transfer(tokenIdToOwner[_tokenId], msg.sender, _tokenId);
    }

    function name() public view returns (string _name) {
        _name = "My's Real Estate Token";
    }

    function symbol() public view returns (string _symbol) {
        _symbol = "MyRET";
    }

    function _owns(address _claimant, uint256 _tokenId) private view returns (bool) {
        return tokenIdToOwner[_tokenId] == _claimant;
    }

    function _approved(address _to, uint256 _tokenId) private view returns (bool) {
        return tokenIdToApproved[_tokenId] == _to;
    }

    function _transfer(address _from, address _to, uint256 _tokenId) private {
        ownershipTokenCount[_to]++;
        tokenIdToOwner[_tokenId] = _to;

        if (_from != address(0)) {
            ownershipTokenCount[_from]--;
            delete tokenIdToApproved[_tokenId];
        }

        Transfer(_from, _to, _tokenId);
    }

    function _isContract(address addr) private view returns (bool) {
        uint256 size;
        assembly {size := extcodesize(addr)}
        return size > 0;
    }
}

library SafeMath {

    /**
    * @dev Multiplies two numbers, throws on overflow.
    */
    function mul(uint256 a, uint256 b) internal pure returns (uint256) {
        if (a == 0) {
            return 0;
        }
        uint256 c = a * b;
        assert(c / a == b);
        return c;
    }

    /**
    * @dev Integer division of two numbers, truncating the quotient.
    */
    function div(uint256 a, uint256 b) internal pure returns (uint256) {
        // assert(b > 0); // Solidity automatically throws when dividing by 0
        uint256 c = a / b;
        // assert(a == b * c + a % b); // There is no case in which this doesn't hold
        return c;
    }

    /**
    * @dev Substracts two numbers, throws on overflow (i.e. if subtrahend is greater than minuend).
    */
    function sub(uint256 a, uint256 b) internal pure returns (uint256) {
        assert(b <= a);
        return a - b;
    }

    /**
    * @dev Adds two numbers, throws on overflow.
    */
    function add(uint256 a, uint256 b) internal pure returns (uint256) {
        uint256 c = a + b;
        assert(c >= a);
        return c;
    }
}
