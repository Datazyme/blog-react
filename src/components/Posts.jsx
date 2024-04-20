import React from 'react'
import { useState } from 'react'

import Thumbnail1 from '../images/blog1.jpg'
import Thumbnail2 from '../images/blog2.jpg'
import Thumbnail3 from '../images/blog4.jpg'
import PostItem from './PostItem'

const testPosts = [
    {
        id: '1',
        thumbnail1: Thumbnail1,
        category: 'education',
        title: 'Monkeys mix Grafitti and Beaching first post',
        desc: 'Monkey is a common name that may refer to most mammals of the infraorder Simiiformes, also known as the simians. Traditionally, all animals in the group now known as simians are counted as monkeys except the apes. Thus monkeys, in that sense, constitute an incomplete paraphyletic grouping; however, in the broader sense based on cladistics, apes (Hominoidea) are also included, making the terms monkeys and simians synonyms in regard to their scope.',
        authorID: 3
    },
    {
        id: '2',
        thumbnail1: Thumbnail2,
        category: 'science',
        title: 'Cyborg raises hand to because it knows the ansers second post',
        desc: '"Cyborg" is not the same thing as bionics, biorobotics, or androids; it applies to an organism that has restored function or, especially, enhanced abilities due to the integration of some artificial component or technology that relies on some sort of feedback, for example: prostheses, artificial organs, implants or, in some cases, wearable technology.[3] Cyborg technologies may enable or support collective intelligence.[4] A related, possibly broader, term is the "augmented human".[3][5][6] While cyborgs are commonly thought of as mammals, including humans, they might also conceivably be any kind of organism.',
        authorID: 1
    },
    {
        id: '3',
        thumbnail1: Thumbnail3,
        category: 'entertainmnet',
        title: 'Chamelions and their dreamcoats 3rd post',
        desc: 'Chameleons or chamaeleons (family Chamaeleonidae) are a distinctive and highly specialized clade of Old World lizards with 200 species described as of June 2015.[1] The members of this family are best known for their distinct range of colours, being capable of colour-shifting camouflage. The large number of species in the family exhibit considerable variability in their capacity to change colour. For some, it is more of a shift of brightness (shades of brown); for others, a plethora of colour-combinations (reds, yellows, greens, blues) can be seen.',
        authorID: 4
    },
    {
        id: '4',
        thumbnail1: Thumbnail3,
        category: 'science',
        title: 'I said party 4th post',
        desc: 'A party is a gathering of people who have been invited by a host for the purposes of socializing, conversation, recreation, or as part of a festival or other commemoration or celebration of a special occasion. A party will often feature food and beverages, and often conversation, music, dancing, or other forms of entertainment.',
        authorID: 2
    }
]

const Posts = () => {
    const [posts, setPosts] = useState(testPosts)
  return (
    <section className='posts'>
        {
            posts.map(() => <PostItem></PostItem>)
        }

    </section>
  )
}

export default Posts