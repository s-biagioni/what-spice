Credits:
https://www.edureka.co/blog/rest-api-with-node-js/


## To Run

$ npm install
$ node .\script.js


## Test

On Postman

1. Select POST from the dropdown list.
2. Url: localhost:8080/api/spices/
3. Write the JSON lines in the 'Body' tab, selecting the radio button 'raw'.

{
    "food": "tuna"
}

4. The response should be as follows.

[
    {
        "food": "tuna",
        "spice": "paprika"
    }
]