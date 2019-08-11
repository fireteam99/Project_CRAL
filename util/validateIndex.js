const soc = require('../apis/soc');

// checks to see if an index is valid and returns some data about that index
const validateIndex = async index => {
    try {
        // grab the year term and campus level from storage

        // get a list of all the availible courses
        const response = await soc.get('/courses.gz', {
            params: {
                year,
                term,
                campus,
                level,
            },
        });
        const courses = response.data;
        let selectedCourse = null;
        let selectedSection = null;
        for (course of courses) {
            console.log('test');
            for (section of course.sections) {
                if (selectedCourse || selectedSection) {
                    break;
                }
                if (section.index === index) {
                    selectedCourse = course;
                    selectedSection = section;
                    break;
                }
            }
        }
        // console.log(selectedCourse);
        // console.log('-------------------------------------');
        // console.log(selectedSection);
        return {
            course: selectedCourse,
            section: selectedSection,
        };
    } catch (err) {
        console.log(err);
    }
};

(async () => {
    await validateIndex({
        index: '14502',
        year: '2019',
        term: '9',
        campus: 'NB',
        level: 'U',
    });
})();
