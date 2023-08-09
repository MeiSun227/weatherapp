*** Settings ***
Documentation       Template robot main suite.
Library     RPA.Browser.Selenium    auto_close=${TRUE}
Library    DateTime


*** Tasks ***
Open the website of React Application
    Open website
    Page Should Contain Weather
    

*** Keywords ***
Open website
    Open Available Browser    https://dr6fak363sik7.cloudfront.net/index.html

Page Should Contain Weather
    Page Should Contain Element    xpath=//div[@class="weatherCard"]

Close website