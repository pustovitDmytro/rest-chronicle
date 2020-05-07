{{#each groups}}
# {{@key}} 
    {{#each this}}
        {{#each this}}
            {{#with (findById ../../actions this)}}

## {{@../key}}
    
### Request

    {{request.method}} {{request.path}}
                {{#if request.headers}}
**Headers**
                    {{#each request.headers}}
* {{@key}}: {{this}}
                    {{/each}}
                {{/if}}

                {{#if request.body}}
**Body**
```javascript          
{{json request.body 4}}
```
                {{/if}}

### Response

**Status:** {{response.status.code}} 

**Type:** {{response.info.type}}

                {{#if response.headers}}

**Headers**
                    {{#each response.headers}}
        {{@key}}: {{this}}
                    {{/each}}
                {{/if}}
                {{#if response.body}}

**Body**
```javascript 
{{json response.body 4}}
```
                {{/if}}
            {{/with}}
        {{/each}}
    {{/each}}
{{/each}}