/*DROP TABLE IF EXISTS worldPopulationsData;

CREATE TABLE worldPopulationsData (
    locationid INT,
    location VARCHAR,
    iso3 VARCHAR,
    time INT,
    population DECIMAL,
    gdp DECIMAL,
    longitude DECIMAL,
    latitude DECIMAL
);
*/

COPY (
	SELECT json_agg(row_to_json(worldPopulationsData))
	from worldPopulationsData where time = 2020
) to '/Applications/GT Bootcamp/GT-VIRT-DATA-PT-05-2022-U-LOLC/Project 3/static/data/worldPopulationsData.json'
