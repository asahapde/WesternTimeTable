export class Schedule {
    name:String
    username: String
    description: String
    public: Boolean
    courses: [{course: String, subject: String}]
    updatedAt: Date
}