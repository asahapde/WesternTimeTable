export class Course {
    catalog_nbr: string;
    subject: string;
    className: string;
    course_info: Info[];
    catalog_description: string;
}

class Info {
    class_nbr: number;
    start_time: string;
    descrlong: string;
    end_time: string;
    campus: string;
    facility_ID: string;
    days: string[];
    instructors: string[];
    class_section: string;
    ssr_component: string;
    enrl_stat: string;
    descr: string
}