select * from populations;
select * from gdp;
select * from locations;

select populations.location,populations.time,populations.population,
gdp.gdp,locations.longitude, locations.latitude
from populations
join gdp
ON populations.location = gdp.country
AND populations.time = gdp.year
join locations
ON populations.location = locations.name;