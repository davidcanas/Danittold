class Command {
    constructor(client, options) {
        this.client = client
        this.name = options.name
        this.description = options.description || "Este comando não tem nenhuma descrição."
        this.identifier = options.identifier 
        this.options = options.options
        this.requireDatabase = options.requireDatabase
        this.category = options.category
        this.aliases = options.aliases || []
    }
}

module.exports = Command