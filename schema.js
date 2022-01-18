// schema.js
module.exports = `
schema {
    query: Query
    mutation: Mutation
    subscription: Subscription
  }
  
  type Comment {
    commentid: String!
    content: String
    todoid: ID!
  }
  
  type Mutation {
    addComment(content: String, todoid: ID!): Comment
    addTodo(description: String, id: ID!, name: String, priority: Int, status: TodoStatus): Todo
    createTodoConnection(input: CreateTodoConnectionInput!): TodoConnection
    deleteTodoConnection(input: DeleteTodoConnectionInput!): TodoConnection
    updateTodoConnection(input: UpdateTodoConnectionInput!): TodoConnection
  }
  
  type Query {
    getTodoConnection(nextToken: String!): TodoConnection
    getTodos(limit: Int, nextToken: String): TodoConnection
    listTodoConnections(filter: TableTodoConnectionFilterInput, limit: Int, nextToken: String): TodoConnectionConnection
  }
  
  type Subscription {
    onCreateTodoConnection(nextToken: String): TodoConnection @aws_subscribe(mutations : ["createTodoConnection"])
    onDeleteTodoConnection(nextToken: String): TodoConnection @aws_subscribe(mutations : ["deleteTodoConnection"])
    onUpdateTodoConnection(nextToken: String): TodoConnection @aws_subscribe(mutations : ["updateTodoConnection"])
  }
  
  type Todo {
    comments: [Comment]
    description: String
    id: ID!
    name: String
    priority: Int
    status: TodoStatus
  }
  
  type TodoConnection {
    nextToken: String
    todos: [Todo]
  }
  
  type TodoConnectionConnection {
    items: [TodoConnection]
    nextToken: String
  }
  
  enum TodoStatus {
    done
    pending
  }
  
  input CreateTodoConnectionInput {
    nextToken: String!
  }
  
  input DeleteTodoConnectionInput {
    nextToken: String!
  }
  
  input TableBooleanFilterInput {
    eq: Boolean
    ne: Boolean
  }
  
  input TableFloatFilterInput {
    between: [Float]
    contains: Float
    eq: Float
    ge: Float
    gt: Float
    le: Float
    lt: Float
    ne: Float
    notContains: Float
  }
  
  input TableIDFilterInput {
    beginsWith: ID
    between: [ID]
    contains: ID
    eq: ID
    ge: ID
    gt: ID
    le: ID
    lt: ID
    ne: ID
    notContains: ID
  }
  
  input TableIntFilterInput {
    between: [Int]
    contains: Int
    eq: Int
    ge: Int
    gt: Int
    le: Int
    lt: Int
    ne: Int
    notContains: Int
  }
  
  input TableStringFilterInput {
    beginsWith: String
    between: [String]
    contains: String
    eq: String
    ge: String
    gt: String
    le: String
    lt: String
    ne: String
    notContains: String
  }
  
  input TableTodoConnectionFilterInput {
    nextToken: TableStringFilterInput
  }
  
  input UpdateTodoConnectionInput {
    nextToken: String!
  }
  
`;

module.exports = {
  API_KEY: "da2-r4istyhodnfgpo2apkzsyxjoyu",
  API_URL:
    "https://dsv7kfhl4nbtjnir6nffnh6sza.appsync-api.us-east-1.amazonaws.com/graphql",
};
