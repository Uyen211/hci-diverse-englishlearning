import { useState } from 'react';

export default function UnitSelectorModal({ isOpen, onClose, onSelect, units, levels }) {
  const [selectedLvlId, setSelectedLvlId] = useState(levels[0]?.id || '');
  const [search, setSearch] = useState('');

  if (!isOpen) return null;

  const currentLevel = levels.find((l) => l.id === selectedLvlId);
  const filteredUnits = units.filter((u) => {
    const matchesLvl = u.levelId === selectedLvlId;
    const matchesSearch = u.title.toLowerCase().includes(search.toLowerCase()) || u.topic.toLowerCase().includes(search.toLowerCase());
    return matchesLvl && matchesSearch;
  });

  return (
    <div className="modal-overlay" style={{ zIndex: 9999 }}>
      <div className="modal-box" style={{ width: '680px', maxWidth: '90%' }}>
        {/* Header */}
        <div className="page-header-row" style={{ borderBottom: '2px solid rgba(78, 86, 192, 0.1)', paddingBottom: '12px' }}>
          <span style={{ fontFamily: 'var(--font-primary)', fontSize: '18px', fontWeight: '800', color: 'var(--text-primary)' }}>
            Chọn Unit liên kết
          </span>
          <button
            type="button"
            onClick={onClose}
            className="btn-secondary"
            style={{ padding: '6px 12px', fontSize: '12px' }}
          >
            Đóng
          </button>
        </div>

        {/* Content Body */}
        <div style={{ display: 'flex', gap: '24px', minHeight: '300px', marginTop: '16px' }}>
          {/* Left: Level Sidebar Selector */}
          <div style={{ width: '200px', display: 'flex', flexDirection: 'column', gap: '8px', borderRight: '1px solid rgba(78, 86, 192, 0.08)', paddingRight: '12px' }}>
            <span style={{ fontSize: '11px', fontWeight: '700', color: 'var(--text-secondary)', textTransform: 'uppercase', marginBottom: '4px' }}>
              Cấp độ học
            </span>
            {levels.map((lvl) => (
              <button
                key={lvl.id}
                type="button"
                onClick={() => setSelectedLvlId(lvl.id)}
                className={`index-item ${selectedLvlId === lvl.id ? 'active' : ''}`}
                style={{
                  width: '100%',
                  textAlign: 'left',
                  border: 'none',
                  background: selectedLvlId === lvl.id ? 'rgba(78, 86, 192, 0.08)' : 'transparent',
                  color: selectedLvlId === lvl.id ? 'var(--primary)' : 'var(--text-secondary)',
                  padding: '10px 12px',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontWeight: selectedLvlId === lvl.id ? '700' : '600',
                  fontSize: '13px'
                }}
              >
                {lvl.name} ({lvl.cefrShort})
              </button>
            ))}
          </div>

          {/* Right: Unit List */}
          <div style={{ flexGrow: 1, display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '13px', fontWeight: '700', color: 'var(--text-secondary)' }}>
                Danh sách Unit - {currentLevel?.name || ''}
              </span>
              <input
                type="text"
                placeholder="Tìm nhanh Unit..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                style={{
                  backgroundColor: 'var(--surface)',
                  border: '1px solid rgba(78, 86, 192, 0.15)',
                  borderRadius: '6px',
                  padding: '4px 10px',
                  fontSize: '12px',
                  outline: 'none',
                  width: '150px'
                }}
              />
            </div>

            <div style={{ flexGrow: 1, overflowY: 'auto', maxHeight: '240px', display: 'flex', flexDirection: 'column', gap: '8px', paddingRight: '4px' }}>
              {filteredUnits.length === 0 ? (
                <div style={{ padding: '40px 0', textAlign: 'center', color: 'var(--text-secondary)', fontSize: '12px' }}>
                  Không tìm thấy unit nào phù hợp.
                </div>
              ) : (
                filteredUnits.map((u) => (
                  <div
                    key={u.id}
                    onClick={() => onSelect(u)}
                    className="index-item"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '12px 14px',
                      borderRadius: '8px',
                      cursor: 'pointer',
                      border: '1px solid rgba(78, 86, 192, 0.06)',
                      backgroundColor: 'var(--surface)',
                      transition: 'all 0.2s'
                    }}
                  >
                    <div>
                      <div style={{ fontWeight: '700', color: 'var(--primary)', fontSize: '13px' }}>
                        {u.sequence}: {u.title}
                      </div>
                      <div style={{ fontSize: '11px', color: 'var(--text-secondary)', marginTop: '2px' }}>
                        Chủ đề: {u.topic}
                      </div>
                    </div>
                    <button
                      type="button"
                      className="btn-secondary"
                      style={{ padding: '4px 10px', fontSize: '11px', pointerEvents: 'none' }}
                    >
                      Chọn
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
