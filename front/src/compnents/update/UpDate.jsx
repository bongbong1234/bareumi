import React, { useRef, useState } from 'react'
import api from '../../config/api.config';
import './userChange.css';

const Update = ({user}) => {
const [previewImage, setPreviewImage] = useState(null); // 이미지 미리보기
const [newName, setNewName] = useState(user.user_name); // 이름 상태
const fileInputRef = useRef();

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
    <div className="pwchk-success">
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
        </div>
  )
}

export default Update