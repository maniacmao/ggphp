<?php

date_default_timezone_set('UTC');

include_once 'alicloud-php-updaterecord/V20150109/AlicloudUpdateRecord.php';

use Roura\Alicloud\V20150109\AlicloudUpdateRecord;

$AccessKeyId     = 'LTAIfpVDxmYIQ7v6';
$AccessKeySecret = 'tsdIzqfpIDAANZEYzILSdX1kqvi8vt';

$updater         = new AlicloudUpdateRecord($AccessKeyId, $AccessKeySecret);

$newIp = $_SERVER['REMOTE_ADDR']; // New IP

$url = 'http://tool.huixiang360.com/zhanzhang/ipaddress.php';
$ch = curl_init($url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
$a  = curl_exec($ch);
preg_match('/\[(.*)\]/', $a, $ip);
$newIp = $ip[1];

$updater->setDomainName('fanhuajinluo.com');
$updater->setRecordType('A');
$updater->setRR('www');
$updater->setValue($newIp);

print_r($updater->sendRequest());
