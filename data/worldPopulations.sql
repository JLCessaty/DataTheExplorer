select * from populations;
select * from gdp;
select * from locations;

select populations.locationid, populations.location,populations.iso3,populations.time,populations.population,
gdp.gdp,locations.longitude, locations.latitude
from populations
join gdp
ON populations.locationid = gdp.locationid
AND populations.time = gdp.year
join locations
ON populations.locationid = locations.id;