{{#each groups}}
# {{@key}} 
    {{#each this}}
        {{#each this}}
            {{#with (findById ../../actions this)}}

## {{@../key}}
    
### Request

    {{request.method}} {{request.path}}
                    {{#if (notEmpty request.params)}}

**Params**

                    {{#each request.params}}
* {{@key}}: {{{this}}}
                    {{/each}}
                {{/if}}
                {{#if (notEmpty request.query)}}

**Query**

                    {{#each request.query}}
* {{@key}}: {{{this}}}
                    {{/each}}
                {{/if}}
                {{#if request.headers}}

**Headers**

                    {{#each request.headers}}
* {{@key}}: {{{this}}}
                    {{/each}}
                {{/if}}

                {{#if request.body}}
**Body**

```json          
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
{{inspect response.body @root.options}}
```

                {{/if}}
            {{/with}}
        {{/each}}
    {{/each}}
{{/each}}