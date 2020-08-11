module.exports = class Command {
    constructor(info) {
        this.name = info.name;
        this.category = info.category;
        this.description = info.description;
        this.usage = info.usage || [info.name];
        this.example = info.example || [];
        this.aliases = info.aliases || [];
        this.perms = info.perms || 'everyone';
    }
};
