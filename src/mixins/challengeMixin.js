let challengeMixin = {
  data: function () {
    return {
      tags: ['UI', 'Tech', 'Optimize', 'Feature'],
      challenges: [],
      defaultChallenge: {
        name: '',
        description: '',
        owner: null,
        tags: [],
        likes: 0,
        dislikes: 0,
        created: null,
      }
    };
  },
  methods: {
    createChallenge: function (challenge) {
      this.challenges.push(this.deepCopy(challenge));
    },
    getBaseChallenge: function () {
      return this.deepCopy(this.defaultChallenge);
    },
    getExistingTags: function () {
      return this.tags;
    },
    getChallenges: function () {
      let challenges = localStorage.getItem('challenges');
      if(challenges && challenges.length) {
        return JSON.parse(challenges);
      } else {
        return [];
      }
    },
    setChallenge: function (challenge) {
      let challenges = this.getChallenges();
      challenges.push(challenge);
      this.setChallenges(challenges);
    },
    setChallenges: function (challenges) {
      localStorage.setItem('challenges', challenges.length ? JSON.stringify(challenges) : '');
    }
  }
};

export default challengeMixin;
