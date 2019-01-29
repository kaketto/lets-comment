module.exports = {
  categories: [
    {
      name: 'places',
      path: 'places'
    },
    {
      name: 'food',
      path: 'food'
    },
    {
      name: 'activities',
      path: 'activities'
    }
  ],
  posts: [
    {
      id: '1',
      timestamp: Date.now(),
      title: 'Spring trip',
      body: 'Let\'s go to Siklos!',
      author: 'Viki',
      category: 'places',
      voteScore: '1',
      deleted: false
    },
    {
      id: '2',
      timestamp: Date.now(),
      title: 'Easter trip',
      body: 'What about a long weekend trip at Easter?',
      author: 'en',
      category: 'places',
      voteScore: '1',
      deleted: false
    },
    {
      id: '3',
      timestamp: Date.now(),
      title: 'Sunday brunch',
      body: 'What shall we prepare on a Sunday brunch?',
      author: 'en',
      category: 'food',
      voteScore: '1',
      deleted: false
    }
  ],
  comments: [
    {
      id: 'a1',
      parentId: '1',
      timestamp: Date.now(),
      body: 'Great idea!',
      author: 'en',
      voteScore: '1',
      deleted: false,
      parentDeleted: false
    }
  ]
}