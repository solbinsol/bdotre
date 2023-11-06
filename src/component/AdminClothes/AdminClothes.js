import React, { useState ,useEffect} from "react";
import style from "./AdminClothes.module.css";
  
const AdminClothes = () => {
  const [clothes, setClothes] = useState([]);
  const [sizes, setSizes] = useState({}); // 모든 옷의 사이즈를 저장할 객체


  

  const [newSizeData, setNewSizeData] = useState({
    ClothesNum: '',
    Size: '',
    TotalLength: '',
    Waist: '',
    Hips: '',
    Thigh: '',
    Rise: '',
  });
  const handleNewSizeChange = (e) => {
    const { name, value } = e.target;
    setNewSizeData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };
  
  const handleSizeSubmit = async (e) => {
    e.preventDefault();
    console.log(newSizeData);
    try {
      const res = await fetch('http://localhost:3000/api/addsize', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newSizeData),
      });
  
      if (!res.ok) {
        const errorDetail = await res.text(); // 서버가 반환한 에러 메시지를 텍스트로 가져옵니다.
        console.error('Error details:', errorDetail); // 콘솔에 에러 상세 내용을 출력합니다.
        throw new Error('사이즈 추가 실패: ' + errorDetail);
      }
    

      setNewSizeData({ // 폼을 초기화합니다.
        ClothesNum: '',
        Size: '',
        TotalLength: '',
        Waist: '',
        Hips: '',
        Thigh: '',
        Rise: '',
      });
    } catch (error) {
      console.error('사이즈 추가 중 에러 발생:', error);
      alert(error.message);
    }
  };
  
  
  const fetchSizes = async (clothesNum) => {
    try {
      const res = await fetch(`http://localhost:3000/api/detail?clothesNum=${clothesNum}`);
      const data = await res.json();
      setSizes(prevSizes => ({ ...prevSizes, [clothesNum]: data.sizes }));
    } catch (error) {
      console.error('Failed to fetch sizes:', error);
    }
  };

  // 의류 목록이 바뀔 때마다 사이즈 정보를 가져오기
  useEffect(() => {
    clothes.forEach((cloth) => {
      fetchSizes(cloth.ClothesNum);
    });
  }, [clothes]);

  useEffect(() => {
    const fetchClothes = async () => {
      try {
        const res = await fetch('http://localhost:3000/api/clothes');
        const data = await res.json();
        setClothes(data.clothes);
      } catch (error) {
        console.error('Failed to fetch clothes:', error);
      }
    };

    fetchClothes();
  }, []);


  const [clothesData, setClothesData] = useState({
    ClothesName: '',
    Price: '',
    ClothesPicture: '',
  });

  const [sizeData, setSizeData] = useState({
    Size: '',
    TotalLength: '',
    Waist: '',
    Hips: '',
    Thigh: '',
    Rise: '',
  });

  const handleClothesChange = (e) => {
    const { name, value } = e.target;
    setClothesData({
      ...clothesData,
      [name]: value,
    });
  };



const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(clothesData);

    console.log(sizeData);
    // 의류 정보와 사이즈 정보를 한 번에 API로 전송하는 로직
    try {
      const res = await fetch('http://localhost:3000/api/addclothes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ clothesData, sizeData }),
      });
  
      if (!res.ok) throw new Error('의류 및 사이즈 정보 추가 실패');
      alert('의류 및 사이즈 정보가 성공적으로 추가되었습니다.');
    } catch (error) {
      console.error('추가 중 에러 발생:', error);
      alert(error.message);
    }
  };
  

  return (
    
    <div className={style.AdminClothes}>
        <div className={style.Closet}>
        <table>
          <thead>
            <tr>
              <th>Num</th>
              <th>Name</th>
              <th>Price</th>
              <th>Size</th>

              <th>삭제</th>
            </tr>
          </thead>
          <tbody>
            {clothes.map((item, index) => (
              <tr key={item.ClothesNum}>
                <td>{item.ClothesNum}</td>
                <td>{item.ClothesName}</td>
                <td>{`${item.Price}0원`}</td>
                <td>{sizes[item.ClothesNum]?.map(size => size.Size).join(', ')}
</td>
                <td>
                  {/* Action buttons here */}
                  X
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        </div>

      <form onSubmit={handleSubmit}>
        <div>
            <h2>제품 추가</h2>

          <label>의류 이름:</label>
          <input
            type="text"
            name="ClothesName"
            value={clothesData.ClothesName}
            onChange={handleClothesChange}
          />
        </div>
        <div>
          <label>가격:</label>
          <input
            type="number"
            name="Price"
            value={clothesData.Price}
            onChange={handleClothesChange}
          />
        </div>
        <div>
          <label>이미지 URL:</label>
          <input
            type="text"
            name="ClothesPicture"
            value={clothesData.ClothesPicture}
            onChange={handleClothesChange}
          />

        </div>
<button type="submit">추가하기</button>
</form>
              <form  onSubmit={handleSizeSubmit}>
        {/* 사이즈 정보 입력 필드를 여러 개 추가해야 할 수도 있습니다. */}
        <div>
            <h2>제품 정보 입력</h2>
          <label>추가할 옷 넘버</label>
          <input
            type="number"
            name="ClothesNum"
            value={newSizeData.ClothesNum}
            onChange={handleNewSizeChange}
          />
          </div>
          <div>
          <label>사이즈:</label>
          <input
            type="text"
            name="Size"
            value={newSizeData.Size}
            onChange={handleNewSizeChange}
          />
        </div>
        <div>
          <label>총장:</label>
          <input
            type="Number"
            name="TotalLength"
            value={newSizeData.TotalLength}
            onChange={handleNewSizeChange}
          />
        </div>
        <div>
          <label>허리:</label>
          <input
            type="Number"
            name="Waist"
            value={newSizeData.Waist}
            onChange={handleNewSizeChange}
          />
        </div>
        <div>
          <label>엉덩이:</label>
          <input
            type="Number"
            name="Hips"
            value={newSizeData.Hips}
            onChange={handleNewSizeChange}
          />
        </div>
        <div>
          <label>허벅지:</label>
          <input
            type="Number"
            name="Thigh"
            value={newSizeData.Thigh}
            onChange={handleNewSizeChange}
          />
        </div>

        <div>
          <label>밑위:</label>
          <input
            type="Number"
            name="Rise"
            value={newSizeData.Rise}
            onChange={handleNewSizeChange}
          />
        </div>
        <button type="submit">추가하기</button>

        </form>
    </div>
  );
};

export default AdminClothes;
