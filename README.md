# wordpress-to-github implementation for drought.ca.gov

This is the [wordpress-to-github](https://www.npmjs.com/package/@cagov/wordpress-to-github) implementation for [drought.ca.gov](https://drought.ca.gov).

## Deploys services to the following Azure Function

- `FA-GO-WORDPRESS-TO-GITHUB-DROUGHT-CA-GOV` - Function app
- `sagowpghubdroughtcagov` - Storage account

## Target site source

https://github.com/cagov/drought.ca.gov

## Referenced WordPress instances

- https://live-drought-ca-gov.pantheonsite.io/wp-admin/
- https://test-drought-ca-gov.pantheonsite.io/wp-admin/

## WordPress notification config target

You will need to create a Function Key in the Azure instance to use a trigger. See the [wordpress-to-github readme](https://github.com/cagov/wordpress-to-github#readme).

### Trigger Target

`https://fa-go-wordpress-to-github-drought-ca-gov.azurewebsites.net/WordpressSyncHttpTrigger?code=[Put Function Key Here]`

## Current Configuration

See the [endpoints.json](https://github.com/cagov/services-wordpress-to-github-drought-ca-gov/blob/main/WordpressSync/endpoints.json) file in this project for current configuration.
