import { useState, useEffect } from "react";
import {RepoIcon} from '@primer/octicons-react'
import { LoopCircleLoading } from 'react-loadingg';
import "../Components/Profile.css";

var lang = require("language-map");
const Profile = ({name}) => {  
  
  const [loading,setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [user, setUser] = useState([]);
  const [joined, setJoined] = useState("");
  const [repos, setRepos] = useState([]);
  
  const datos = async () => {
    if (name === "" || name === undefined) {
    } else {
      try {
        
        const  userData  = await fetch(`https://api.github.com/users/${name}`)
        const user = await userData.json();
        const  repoData  = await fetch(`https://api.github.com/users/${name}/repos`)
        const repo = await repoData.json();
       
        setRepos(repo);
        let date = new Date(user.created_at);
        setJoined(date.toDateString());
        setUser(user);
        setError(false);
        setLoading(false);
        setTimeout(()=>{
          setLoading(true)
        },800)
      } catch (error) {
        console.log(error);
        setError(true);
      }
    }
  };

  useEffect(() => {
    datos();
  }, [name]);
  return (<div className="prof">
    {(loading === false)? <LoopCircleLoading color="#0070f3"/>:<div className='profile-cont'>
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
              
                <RepoIcon className="repoicon"size={15} />
                <h1> {elm.name}</h1>
              
              <h6 className="public">Public</h6>
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
</div>}
  </div>
  );
};

export default Profile;
