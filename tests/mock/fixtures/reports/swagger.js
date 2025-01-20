export const  createUserAction = {
    'tags' : [
        'Users'
    ],
    'description' : 'create user',
    'parameters'  : [
        {
            'name'   : 'Authorization',
            'in'     : 'header',
            'schema' : {
                'type' : 'string'
            },
            'example' : '25NPmT'
        }
    ],
    'requestBody' : {
        'content' : {
            'application/json' : {
                'schema' : {
                    'type'    : 'object',
                    'example' : {
                        'first_name' : 'Pascal',
                        'last_name'  : 'Ancell',
                        'email'      : 'pancell1@gravatar.com',
                        'gender'     : 'Male'
                    },
                    'properties' : {
                        'first_name' : {
                            'type'    : 'string',
                            'example' : 'Pascal'
                        },
                        'last_name' : {
                            'type'    : 'string',
                            'example' : 'Ancell'
                        },
                        'email' : {
                            'type'    : 'string',
                            'example' : 'pancell1@gravatar.com'
                        },
                        'gender' : {
                            'type'    : 'string',
                            'example' : 'Male'
                        }
                    }
                }
            }
        }
    },
    'responses' : {
        '200' : {
            'description' : 'create user',
            'content'     : {
                'application/json' : {
                    'schema' : {
                        'type'    : 'object',
                        'example' : {
                            'id'         : 2,
                            'first_name' : 'Pascal',
                            'last_name'  : 'Ancell',
                            'email'      : 'pancell1@gravatar.com',
                            'gender'     : 'Male'
                        },
                        'properties' : {
                            'id' : {
                                'type'    : 'number',
                                'example' : 2
                            },
                            'first_name' : {
                                'type'    : 'string',
                                'example' : 'Pascal'
                            },
                            'last_name' : {
                                'type'    : 'string',
                                'example' : 'Ancell'
                            },
                            'email' : {
                                'type'    : 'string',
                                'example' : 'pancell1@gravatar.com'
                            },
                            'gender' : {
                                'type'    : 'string',
                                'example' : 'Male'
                            }
                        }
                    }
                }
            }
        }
    }
};
