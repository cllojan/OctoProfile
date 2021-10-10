import { useState, useEffect } from "react";
import { Octokit } from "@octokit/core";
import "../Components/Profile.css";
const octokit = new Octokit({
  auth: `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`,
});
var lang = require("language-map");
const Profile = (name) => {
  const [error, setError] = useState(false);
  const [user, setUser] = useState([]);
  const [joined, setJoined] = useState("");
  const [repos, setRepos] = useState([]);

  const datos = async () => {
    if (name.name === "" || name.name === undefined) {
    } else {
      try {
        const { data: user } = await octokit.request("GET /users/{name}", {
          name: `${name.name}`,
        });
        const { data: repo } = await octokit.request(
          "GET /users/{name}/repos",
          {
            name: `${name.name}`,
          }
        );
        setRepos(repo);
        let date = new Date(user.created_at);
        setJoined(date.toDateString());
        setUser(user);
        setError(false);
      } catch (error) {
        console.log(error);
        setError(true);
      }
    }
  };

  useEffect(() => {
    datos();
  }, [name]);
  return (
    <div className='profile-cont'>
      {error === true ? (
        <div>Error</div>
      ) : (
        <div className='cont-user'>
          <div className='user'>
            <img
              className='img-profile'
              src={user.avatar_url}
              alt={user.login}
              width='150px'
            />
            <h3 className='user-name'>{user.name}</h3>
            <h5 className='user-login'>{user.login}</h5>
            <div className='user-loc'>
              <h4>
                <i className='fas fa-map-marker-alt'></i>
                {user.location}
              </h4>
              <h4 className='joined'>
                <i className='fas fa-calendar-alt'></i>
                {joined}
              </h4>
            </div>
            <div className='user-fav'>
              <div className='public_repos'>
                <h4>Repos</h4>
                <h5>{user.public_repos}</h5>
              </div>
              <div className='followers'>
                <h4>Followers</h4>
                <h5>{user.followers}</h5>
              </div>

              <div className='following'>
                <h4>Following</h4>
                <h5>{user.following}</h5>
              </div>
            </div>
          </div>
          <div className='cont-repos'>
            {repos.map((elm, index) => (
              <a href={elm.html_url} key={index} className='repo'>
                <div className='repo-title'>
                  <h1>{elm.name}</h1>
                </div>
                <div className='repo-info'>
                  <div className='info-t'>
                    <div>
                      {elm.language === "" ? (
                        console.log("ss")
                      ) : (
                        <h4 className='info-type'>
                          <span
                            style={{
                              marginRight: "8px",
                              color: `${
                                elm.language === null
                                  ? "transparent"
                                  : lang[elm.language].color
                              }`,
                            }}
                          >
                            <i className='fas fa-circle'></i>
                          </span>
                          {elm.language}
                        </h4>
                      )}
                    </div>

                    <div>
                      {elm.stargazers_count === 0 ? (
                        <span></span>
                      ) : (
                        <h4 className='info-type'>
                          <i className='fas fa-star'></i>
                          <span>{elm.stargazers_count}</span>
                        </h4>
                      )}
                    </div>
                    <div>
                      {elm.forks_count === 0 ? (
                        <span></span>
                      ) : (
                        <h4 className='info-type'>
                          <i className='fas fa-code-branch'></i>
                          {elm.forks_count}
                        </h4>
                      )}
                    </div>
                  </div>
                  <h4 className='size'>{elm.size} KB</h4>
                </div>
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
