# USAA Full Transaction Exporter

## Problem
USAA in the past has terminated its API options for 3rd party financial software (except for Quicken) to pull your transaction data.  You are still able to login to the USAA site and export your transactions as a CSV but this data is lacking many of the important pieces of information (such as transaction ID).  However, this data is pulled down to your browser when you select to export, but it just isn't part of the set that is downloaded for your use in the CSV file.  We need much more of the information that the CSV provides to make it useful for ingest into 3rd party financial software.

## Solution
A Chrome extension that listens for the full transaction data to be downloaded to your browser when exporting and dumps that full data out to you as a downloaded json file.

## Warnings
- I know a Chrome extension mucking in your financial data is worrysome so I have provided the full source code here for inspection.  There is no other capability other than dumping this transaction data as a json file to your machine.
- THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
- This extension is open source and freely available on Github.  Beware of any forks or copies of this software that have made modifications.  Fully investigate the source code in this repo and any forked or copied version.


## How to use
- installation
    - clone or download this repo
    - add it as an unpacked extension in Chrome
        - go to chrome://extensions/ in your browser address bar
        - select "Load unpacked" button in the top left
        - select the folder where this repo is copied to on your machine
        - ensure the small toggle button in the lower right of the extension information is toggled on
- getting transaction data
    - login to USAA and go to your checking or savings account
    - select the "Export" button
    - you **MUST** choose the "Select Date Range" option
        - choosing the "On Screen" option does **NOT** redownload the data and will not be intercepted for dumping
    - choose your beginning and end dates
    - click the "Export" button
    - this will download to you the "full_info.json" file as well as the standard "bk_download.csv" file that USAA normally generates for you
    
