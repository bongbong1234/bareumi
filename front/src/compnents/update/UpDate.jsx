import React, { useRef, useState } from 'react';
import api from '../../config/api.config';
import './update.css';
import { useParams } from 'react-router-dom';
import PwChange from './PwChange';
import MemberOut from './MemberOut';

const UpDate = () => {
  const {path} = useParams();
  console.log(path);


  const user = JSON.parse(sessionStorage.getItem("sessionUser"));
  const [chkPwd, setChkPwd] = useState(false); // 비밀번호 확인 상태
  const [previewImage, setPreviewImage] = useState(null); // 이미지 미리보기
  const [newName, setNewName] = useState(user.user_name); // 이름 상태
  const pwdRef = useRef();
  const fileInputRef = useRef();

  const sendPwd = () => {
    const inputPwd = pwdRef.current.value;
    if (inputPwd === '') {
      alert("비밀번호를 입력해주세요!");
    } else {
      api
        .post('/user/pwd-chk', {
          id: user.user_id,
          pwd: inputPwd,
        })
        .then((res) => {
          if (res.data.message) {
            alert("비밀번호가 확인 되었습니다!");
            setChkPwd(true);
            pwdRef.current.value = '';
          }
        })
        .catch((err) => {
          console.error(err);
          alert("비밀번호를 확인해주세요");
          pwdRef.current.value = '';
        });
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result); // 미리 보기 설정
      };
      reader.readAsDataURL(file);
    }
  };

  const uploadProfile = () => {
    const file = fileInputRef.current.files[0];
    if (file) {
      const formData = new FormData();
      formData.append("image", file);
      formData.append("id", user.user_id);
      formData.append("name", newName);

      api
        .post('/user/update-profile', formData)
        .then((res) => {
          alert("프로필 이미지와 이름이 변경되었습니다!");
          console.log(res.data);
        })
        .catch((err) => {
          console.error(err);
          alert("업데이트에 실패했습니다.");
        });
    }
  };

  return (
    <div className="pwchk-wrapper">
      {chkPwd ? <>
        {path === 'update' && <div className="pwchk-success">
          <h3>프로필 수정</h3>
          {/* 이미지 변경 */}
          <div className="profile-preview">
            {previewImage ? (
              <img src={previewImage} alt="미리 보기" className="profile-preview-img" />
            ) : (
              <div className="profile-placeholder">이미지 선택</div>
            )}
          </div>
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            onChange={handleImageChange}
            className="file-input"
          />

          {/* 이름 변경 */}
          <div className="name-change">
            <label>이름 변경</label>
            <input
              type="text"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              className="name-input"
            />
          </div>

          {/* 저장 버튼 */}
          <button onClick={uploadProfile} className="pwchk-button">
            저장하기
          </button>
        </div>}

        {
            path === 'pwchange' && <PwChange/>
        }

        {
            path === 'memberout' && <MemberOut/>
        }
      </>
        : (
        <>
          <div className="pwchk-container">비밀번호를 확인해주세요.</div>
          <input
            type="password"
            ref={pwdRef}
            placeholder="비밀번호를 입력하세요"
            className="pwchk-input"
          />
          <button onClick={sendPwd} className="pwchk-button">
            확인
          </button>
        </>
      )}
    </div>
  );
};

export default UpDate;
