enum IpAddressType {
  IPv4,
  IPv6,
}

export interface IpInfo {
  ip: string;
  success: boolean;
  type: IpAddressType;
  continent: string;
  continent_code: string;
  country: string;
  country_code: string;
  country_flag: string;
  country_capital: string;
  country_phone: string;
  country_neighbours: string;
  region: string;
  city: string;
  latitude: number;
  longitude: number;
  asn: string;
  org: string;
  isp: string;
  timezone: string;
  timezone_name: string;
  timezone_dstOffset: number;
  timezone_gmtOffset: number;
  timezone_gmt: string;
  currency: string;
  currency_code: string;
  currency_symbol: string;
  currency_rates: number;
  currency_plural: string;
}
