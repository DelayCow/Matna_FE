import React, { useState } from 'react';
import type { MemberProfile } from '../services/data/MypageData';
import defaultProfile from "@/assets/user.png";

interface MyPageProfileCardProps {
  member: MemberProfile | null;
  isOwner: boolean;
  onReport: (memberNo: number) => void;
  onLogout: () => void;
  onEditInfo: () => void;
}

export const MyPageProfileCard = ({ 
  member, 
  isOwner, 
  onReport, 
  onLogout, 
  onEditInfo 
}: MyPageProfileCardProps) => {
  const [showMenu, setShowMenu] = useState(false);

  if (!member) return null;

  return (
    <section className="profile-section px-3 py-3 bg-white position-relative">
      {/* ✅ 케밥 메뉴: 본인일 때만 우측 상단에 표시 */}
      {isOwner && (
        <div className="position-absolute" style={{ top: '15px', right: '15px' }}>
          <button className="btn p-0 border-0" onClick={() => setShowMenu(!showMenu)}>
            <i className="bi bi-three-dots-vertical fs-4 text-dark"></i>
          </button>
          {showMenu && (
            <ul className="custom-dropdown show" style={{ position: 'absolute', right: 0, top: '100%', zIndex: 1000 }}>
              <li><a href="#" onClick={(e) => { e.preventDefault(); onEditInfo(); setShowMenu(false); }}>정보 수정</a></li>
              <li><a href="#" onClick={(e) => { e.preventDefault(); onLogout(); }}>로그아웃</a></li>
            </ul>
          )}
        </div>
      )}

      <div className="d-flex align-items-center">
        <img 
          src={member.imageUrl || defaultProfile} 
          className="rounded-circle border me-3" 
          width="60" 
          height="60" 
          alt="profile" 
        />

        <div className="flex-grow-1">
          <h5 className="fw-bold mb-1">{member.nickname}</h5>
          
          <div>
            {isOwner ? (
              /* ✅ 본인일 때: 맛나머니만 표시 */
              <small 
                className="text-muted text-decoration-underline" 
                style={{ cursor: "pointer" }}
                onClick={() => window.location.href = '/mypage/point/charge'}
              >
                내 맛나머니 : {(member.points ?? 0).toLocaleString()} 원
              </small>
            ) : (
              /* ✅ 타인일 때만: 신고하기 버튼 표시 */
              <button 
                className="btn btn-outline-secondary btn-sm rounded-pill px-2 py-0 mt-1"
                onClick={() => onReport(member.memberNo)}
              >
                <i className="bi bi-exclamation-circle me-1"></i>신고하기
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};