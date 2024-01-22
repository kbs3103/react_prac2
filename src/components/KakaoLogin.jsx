import { Fragment } from "react";

const SocialKakao = () => {
  const Rest_api_key = "dd26f7f6531cd79f4a063db1b1d37190"; //REST API KEY
  const redirect_uri = "http://localhost:5174"; //Redirect URI
  // oauth 요청 URL
  const kakaoURL = `https://kauth.kakao.com/oauth/authorize?client_id=${Rest_api_key}&redirect_uri=${redirect_uri}&response_type=code`;
  const handleLogin = () => {
    window.location.href = kakaoURL;
  };
  return (
    <Fragment>
      <button onClick={handleLogin}>카카오 로그인</button>
    </Fragment>
  );
};
export default SocialKakao;
