export const MenuConstant = {
    menus: [
        {
            roles:[8],
            name: 'Dashboard',
            url: '/exam-dash',
            iconComponent: { name: 'cil-speedometer' },
        },
        {
            roles:[8],
            title: true,
            name: 'Exam'
        },
        {
            roles:[8],
            name: 'Create Exam',
            url: '/create-exam',
            iconComponent: { name: 'cil-pencil' },
        },
        {
            roles:[8],
            name: 'Exam Forms',
            url: '/exam-forms',
            iconComponent: { name: 'cil-notes' },
        },
        {
            roles:[8],
            title: true,
            name: 'Applications'
        },
        // for students
        {
            roles:[7],
            name: 'Dashboard',
            url: '/student-dash',
            iconComponent: { name: 'cil-speedometer' },
        },
        {
            roles:[7],
            title: true,
            name: 'Exam'
        },
        {
            roles:[7],
            name: 'Exams',
            url: '/exam-forms',
            iconComponent: { name: 'cil-inbox' },
        },
        {
            roles:[7],
            name: 'Exam Applications',
            url: '/exam-forms',
            iconComponent: { name: 'cil-notes' },
        },
        {
            roles:[7],
            title: true,
            name: 'Application'
        },
        {
            roles:[7],
            name: 'Applications',
            url: '/applications',
            iconComponent: { name: 'cil-save' },
        },
    ]
}