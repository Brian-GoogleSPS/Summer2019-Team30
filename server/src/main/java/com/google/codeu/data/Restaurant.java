/*
 * Copyright 2019 Google Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

package com.google.codeu.data;

import java.util.UUID;

/** A single message posted by a user. */
public class Restaurant {

  private UUID id;
  private String name;
  private String address;
  private String bio;
  private Double latitude;
  private Double longitude;

  /**
   * Construct a new Restaurant and convert an address to a latitude and longnitude.
   *
   * @param restAddress Address of the Restaurant given.
   */
  public Restaurant(
      String restName, String restAddress, String restBio, Double restLat, Double restLng) {
    /** Convert Address into Latitude and Longitude. */
    id = UUID.randomUUID();
    name = restName;
    address = restAddress;
    bio = restBio;
    latitude = restLat;
    longitude = restLng;
  }

  public UUID getId() {
    return id;
  }

  public String getName() {
    return name;
  }

  public String getAddress() {
    return address;
  }

  public String getBio() {
    return bio;
  }

  public Double getLat() {
    return latitude;
  }

  public Double getLng() {
    return longitude;
  }
}
