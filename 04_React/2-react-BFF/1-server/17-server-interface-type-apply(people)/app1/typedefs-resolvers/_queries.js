const { gql } = require("apollo-server")

const typeDefs = gql`
  type Query {
    equipments: [Equipment]
    supplies: [Supply]
    equipmentAdvs: [EquipmentAdv]
    softwares: [Software]
    software: Software
    givens: [Given]
    people: [People]
    person: People
  }
`

module.exports = typeDefs
