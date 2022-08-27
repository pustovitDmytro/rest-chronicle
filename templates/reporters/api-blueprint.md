FORMAT: 1A

{{#each groups}}
# {{@key}} 
{{#each this}}
    {{#each this}}
        {{#with (findById ../../actions this)}}

## {{@../key}} [{{request.method}} {{request.path}}]

+ Request
    {{#if request.headers}}

    + Headers
        
    {{#each request.headers}}
        {{@key}}: {{this}}
    {{/each}}
    {{/if}}
    {{#if (notEmpty request.query)}}
    
    + Parameters

    {{#each request.query}}
        {{@key}}: {{this}}
    {{/each}}
    {{/if}}
    {{#if request.body}}
 
    + Body
        
        {{ident (json request.body) 8}}
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
         
        {{ident (json response.body) 8}}

    {{/if}}
            {{/with}}
        {{/each}}
    {{/each}}
{{/each}}