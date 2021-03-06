#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Created on Wed Aug 12 03:15:27 2020

@author: user
"""

from selenium import webdriver
import json
import os
import time

driver = webdriver.Firefox()


def is_new():
  try:
    els = driver.find_elements_by_class_name('product-item')
    if(len(els) < 1): return False
    return True
  except:
    return False

def get_houses_by_page(page_number):
  url = 'https://batdongsan.com.vn/ban-nha-rieng/p{0}'.format(page_number)
  driver.get(url)
  new_layout = is_new()
  houses = driver.find_elements_by_class_name('product-item' if new_layout else 'search-productItem')

  house_data = []

  for house in houses:
    address = house.find_element_by_class_name('location' if new_layout else 'product-city-dist').text
    area = house.find_element_by_class_name('area' if new_layout else 'product-area').text
    driver.execute_script("return arguments[0].scrollIntoView();", house)
    images = []
    image_els = house.find_elements_by_tag_name('img')
    for image_el in image_els:
      image_src = image_el.get_attribute('src')
      if('staticfile' not in image_src): images.append(image_src)

    house_data.append({ 'address': address,
                       'area': float(area.replace('m²','')),
                       'files': images })

  return house_data;


data = []

for i in range(1,2):
  data.extend(get_houses_by_page(i))


driver.close()


def write_to_JSON_file(path, fileName, data):
    filePathNameWExt = path + '/' + fileName + '.json'
    with open(filePathNameWExt, 'w', encoding='utf8') as fp:
        json.dump(data, fp, ensure_ascii=False)


write_to_JSON_file('./','data',data)