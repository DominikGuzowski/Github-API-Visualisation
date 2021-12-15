const express = require('express');
const router = express.Router();
const services = require('./services');
const axios = require("axios");
const { doc, setDoc, getDoc } = require("firebase/firestore");

const firestore = require("./firestore");

const gql = () => {
    fetch("/graphql", {
      method:"POST",
      headers: {
        "Content": "application/json",
        Authorization: `Bearer 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`,
      },
      body:JSON.stringify({
        "query":
        '{user(login: "GuzowskD") {    repositoriesContributedTo(contributionTypes: [COMMIT, REPOSITORY], last: 100, includeUserRepositories: false) { pageInfo { startCursor hasPreviousPage } nodes { owner { login } name }}}}'
      })
    }).then(res => res.json()).then(setGitData)
};

const gitGql = async ({user, accessToken}) => {
    
      const userDoc = doc(firestore, `users/${user}`);
      const snapshot = await getDoc(userDoc);
      if(snapshot.exists()) {
          console.log(snapshot.data());
          return snapshot.data();
      } else {
          const data = await axios({url:"https://api.github.com/graphql",
          method:"POST",
          headers: {
            "Content": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
          data:{
            query:
            `{user(login: "${user}") {    repositoriesContributedTo(contributionTypes: [COMMIT, REPOSITORY], last: 100, includeUserRepositories: false) { pageInfo { startCursor hasPreviousPage } nodes { owner { login } name }}}}`
          }
          });

          setDoc(userDoc, {user: data.data.data.user});
          console.log("Added to firestore!", data.data.data.user)
          return data.data.data;
      }

};

router.get("/git-gql/:user/:accessToken", (req, res) => {
    gitGql(req.params).then(({user}) => res.status(200).json({repos: user.repositoriesContributedTo}));
});


module.exports = router;