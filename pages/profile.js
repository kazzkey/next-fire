import Link from 'next/link'
import { useUser } from '../utils/auth/useUser'
import firebase from 'firebase/app'
import { useState } from 'react'

const Profile = () => {
  const [parentName, setParentName] = useState('');
  const [address, setAddress] = useState('');
  const [email, setEmail] = useState('');
  const [childName, setChildName] = useState('');
  const [birthday, setBirthday] = useState('');
  const [school, setSchool] = useState('');
  const [grade, setGrade] = useState('');

  const { user } = useUser()
  if (!user) {
    return <Link href={'/'}><a></a></Link>
  }

  const handleClickAddBtn = async () => {
    if (!parentName || !address || !email || !childName || !grade || !school) {
      alert("フォームに入力してください。");
      return;
    };
    const db = firebase.firestore();
    await db.collection('users').add({
      parentName: parentName,
      address: address,
      email: email,
      childName: childName,
      birthday: birthday,
      grade: grade,
      school: school
    });
    setParentName('');
    setAddress('');
    setEmail('');
    setChildName('');
    setBirthday('');
    setSchool('');
    setGrade('');
  }

  return (
    <div>
      <h2>ユーザ登録</h2>
      <div>
        <label htmlFor="parentName">保護者氏名</label><br />
        <input
          type="text"
          id="parentName"
          value={parentName}
          onChange={(e) => {setParentName(e.target.value)}}
        />
      </div>
      <div>
        <label htmlFor="address">住所</label><br />
        <input
          type="text"
          id="address"
          value={address}
          onChange={(e) => {setAddress(e.target.value)}}
        />
      </div>
      <div>
        <label htmlFor="email">メールアドレス</label><br />
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => {setEmail(e.target.value)}}
        />
      </div>
      <div>
        <label htmlFor="childName">生徒氏名</label><br />
        <input
          type="text"
          id="childName"
          value={childName}
          onChange={(e) => {setChildName(e.target.value)}}
        />
      </div>
      <div>
        <label htmlFor="birthday">生年月日</label><br />
        <input
          type="date"
          id="birthday"
          value={birthday}
          onChange={(e) => {setBirthday(e.target.value)}}
        />
      </div>
      <div>
        <label htmlFor="school">学校</label><br />
        <input
          type="text"
          id="school"
          value={school}
          onChange={(e) => {setSchool(e.target.value)}}
        />
      </div>
      <div>
        <label htmlFor="grade">学年</label><br />
        <input
          type="text"
          id="grade"
          value={grade}
          onChange={(e) => {setGrade(e.target.value)}}
        />
      </div>

      <button onClick={handleClickAddBtn}>
        登録する
      </button>
      <br />
      <Link href={'/'}>
        <a>Home</a>
      </Link>
    </div>
  )
}

export default Profile
