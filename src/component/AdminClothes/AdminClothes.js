import React, { useState ,useEffect} from "react";
import style from "./AdminClothes.module.css";
  
const AdminClothes = () => {
  const [clothes, setClothes] = useState([]);
  const [sizes, setSizes] = useState({}); // 모든 옷의 사이즈를 저장할 객체


  const handleDelete = async (clothesNum) => {
    if (window.confirm(`정말 삭제하시겠습니까? 넘버 : ${clothesNum}? `)) {
      try {
        const res = await fetch(`/api/clothesDelete?clothesNum=${clothesNum}`, {
          method: 'DELETE',
        });
  
        if (!res.ok) {
          throw new Error('Error deleting the item');
        }
  
        // 성공적으로 삭제된 후 UI 업데이트를 위해 상태 갱신
        setClothes(clothes.filter((item) => item.ClothesNum !== clothesNum));
        alert('Item deleted successfully');
  
      } catch (error) {
        console.error(' to delete the itFailedem:', error);
        alert('Failed to delete the item');
      }
    }
  };

  

  

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
  
// ...
const handleSizeSubmit = async (e) => {
  e.preventDefault();
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

    // 응답에서 추가된 사이즈의 ID를 받아옵니다.
    const { addedSizeId } = await res.json();

    // TODO: 추가된 사이즈의 전체 정보를 조회하는 로직을 구현할 수 있습니다.
    // 여기서는 예시로 추가된 사이즈 ID만을 사용합니다.

    // UI 업데이트를 위해 상태를 갱신합니다.
    // 이는 예시 코드이며, 실제 사용 사례에 맞게 조정이 필요할 수 있습니다.
    setSizes(prevSizes => ({
      ...prevSizes,
      [newSizeData.ClothesNum]: [
        ...(prevSizes[newSizeData.ClothesNum] || []),
        {
          SizeID: addedSizeId, // 실제로는 조회한 추가 정보를 여기에 넣어야 합니다.
          Size: newSizeData.Size,
          // 나머지 사이즈 정보도 이곳에 포함시키면 됩니다.
        },
      ],
    }));

    // 폼을 초기화합니다.
    setNewSizeData({
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
// ...

  
  
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
      const addedClothes = await res.json(); // 서버로부터 추가된 옷의 정보를 받습니다.
      setClothes(prevClothes => [...prevClothes, {
        ...clothesData,
        ClothesNum: addedClothes.clothesId,
        // 서버로부터 반환받은 추가된 옷의 ID를 사용하여 ClothesNum 설정
      }]);
  
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
                  <span onClick={() => handleDelete(item.ClothesNum)}>X</span>
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
        <div className={style.ClothesBOX}>
            <h2>제품 정보 입력</h2>
          <label>추가할 옷 넘버</label>
          <input
            type="number"
            name="ClothesNum"
            value={newSizeData.ClothesNum}
            onChange={handleNewSizeChange}
          />
          </div>
          <div className={style.ClothesBOX}>
          <label>사이즈:</label>
          <input
            type="text"
            name="Size"
            value={newSizeData.Size}
            onChange={handleNewSizeChange}
          />
        </div>
        <div className={style.ClothesBOX}>
          <label>총장:</label>
          <input
            type="Number"
            name="TotalLength"
            value={newSizeData.TotalLength}
            onChange={handleNewSizeChange}
          />
        </div>
        <div className={style.ClothesBOX}>
          <label>허리:</label>
          <input
            type="Number"
            name="Waist"
            value={newSizeData.Waist}
            onChange={handleNewSizeChange}
          />
        </div>
        <div className={style.ClothesBOX}>
          <label>엉덩이:</label>
          <input
            type="Number"
            name="Hips"
            value={newSizeData.Hips}
            onChange={handleNewSizeChange}
          />
        </div>
        <div className={style.ClothesBOX}>
          <label>허벅지:</label>
          <input
            type="Number"
            name="Thigh"
            value={newSizeData.Thigh}
            onChange={handleNewSizeChange}
          />
        </div>

        <div className={style.ClothesBOX}>
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
