{{#each groups}}

    # Group {{@key}} 
    {{#each this}}
        {{#each this}}
            {{#with (findById ../../actions this)}}

    ## {{@../key}} [{{request.method}} {{request.path}}]
    
    ### Request

    {{request.method}} {{request.path}}
                {{#if request.body}}
```javascript          
{{json request.body 4}}
```
                {{/if}}

    + Response {{response.status.code}} ({{response.info.type}})

                {{#if response.headers}}

    + Headers
                    {{#each response.headers}}
        {{@key}}: {{this}}
                    {{/each}}
                {{/if}}
                {{#if response.body}}

    + Body

{{json response.body 4}}
                {{/if}}
            {{/with}}
        {{/each}}
    {{/each}}
{{/each}}