import the_athlete_54 from '../../../../src/assets/images/the_athlete_54.jpg'
import office_goer from '../../../../src/assets/images/office_goer.jpg'
import parent from '../../../../src/assets/images/parent.jpg'

const WhoData = [
    {
        id: 'wd1',
        persona: 'The Athlete',
        description: `The Athlete has a specific training plan they use, involving completing various tasks daily, including workout-related tasks or diet-related tasks and all things in-between. These tasks help them progress through their goals, improving performance along their athletic journey. Marblr's structured approach helps them maintain accountability while staying motivated and focused on achieving their goals.`,
        src: the_athlete_54
        // src: 'https://plus.unsplash.com/premium_photo-1671100502322-852957fc1779?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' PREVIOUSLY USED IMAGE
    },
    {
        id: 'wd2',
        persona: 'The Office-Goer',
        description: `The Office-Goer has a detailed schedule they follow, which includes daily tasks related to completing projects and meeting deadlines. These tasks help them stay organized and manage their workload effectively in a busy environment. Marblr's structured approach enables them to maintain focus and productivity while achieving their professional goals.`,
        src: office_goer
    },
    {
        id: 'wd3',
        persona: 'The Parent',
        description: `The Parent follows a carefully crafted routine balancing work, family, and personal commitments, that can include tasks related to managing children's activities, maintaining a workout routine, and everything in-between. These tasks help them juggle responsibilities, ensuring they have time for their professional and personal well-being. Marblr's structured approach allows them to stay organized and focused, enabling them to effectively navigate the challenges of parenthood while pursuing their own goals.`,
        src: parent
    }
]

export default WhoData;