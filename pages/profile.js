import Link from 'next/link'
import { useUser } from '../utils/auth/useUser'
import firebase from 'firebase/app'
import { useState } from 'react'

const Profile = () => {
  const [name, setName] = useState('');

  const { user } = useUser()
  if (!user) {
    return <Link href={'/'}><a></a></Link>
  }

  const handleClickAddBtn = async () => {
    if (!name) {
      alert("フォームに入力してください。");
      return;
    };
    const db = firebase.firestore();
    await db.collection('users').add({
      name: name
    });
    setName('');
  }

  return (
    <div>
      <h2>ユーザ登録</h2>
      <div>
        <label htmlFor="name">氏名</label><br />
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => {setName(e.target.value)}}
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
