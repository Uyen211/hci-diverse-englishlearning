import os
import shutil
import subprocess
import re
import sys

# Ensure UTF-8 printing
try:
    sys.stdout.reconfigure(encoding='utf-8')
except AttributeError:
    import io
    sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

# Source and target file paths
prototype_dir = r"c:\Users\thaor\OneDrive\Documents\HCI-figma\prototype"
file_uc5b = os.path.join(prototype_dir, "figma-uc5b.html")
file_uc08 = os.path.join(prototype_dir, "figma-uc08.html")
grayscale_uc5b = os.path.join(prototype_dir, "uc5b_prototype_grayscale.html")
grayscale_uc08 = os.path.join(prototype_dir, "uc08_prototype_grayscale.html")

scratch_dir = r"C:\Users\thaor\.gemini\antigravity-ide\brain\d19916ff-803a-48f7-b0eb-20f3bcdee2fd\scratch"
gen_uc5b_script = os.path.join(scratch_dir, "generate_figma_uc5b.py")
gen_uc08_script = os.path.join(scratch_dir, "generate_figma_uc08.py")
clean_vt_script = os.path.join(scratch_dir, "clean_all_vietnamese.py")

# SVGs definition
svg_play = '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="margin-right: 4px; display: inline-block; vertical-align: middle;"><polygon points="5 3 19 12 5 21 5 3"/></svg>'
svg_backward = '<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="margin-right: 4px; display: inline-block; vertical-align: middle;"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>'
svg_pause = '<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="margin-right: 4px; display: inline-block; vertical-align: middle;"><rect x="14" y="4" width="4" height="16" rx="1"/><rect x="6" y="4" width="4" height="16" rx="1"/></svg>'
svg_forward = '<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="margin-left: 4px; display: inline-block; vertical-align: middle;"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>'
svg_replay = '<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="margin-right: 4px; display: inline-block; vertical-align: middle;"><path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67"/></svg>'
svg_check = '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="margin-right: 4px; display: inline-block; vertical-align: middle;"><polyline points="20 6 9 17 4 12"/></svg>'
svg_lightbulb = '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="margin-right: 4px; display: inline-block; vertical-align: middle;"><path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A5 5 0 0 0 8 8c0 1 .3 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5"/><path d="M9 18h6"/><path d="M10 22h4"/></svg>'
svg_close = '<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="margin-right: 4px; display: inline-block; vertical-align: middle;"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>'
svg_home = '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="margin-right: 4px; display: inline-block; vertical-align: middle;"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>'
svg_lightning = '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="margin-right: 4px; display: inline-block; vertical-align: middle;"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>'
svg_plus = '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="margin-right: 4px; display: inline-block; vertical-align: middle;"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>'
svg_star = '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-right:4px; vertical-align: middle; color: var(--secondary);"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>'
svg_cat = '<svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" style="color: var(--primary);"><path d="M12 21c-4.418 0-8-3.582-8-8 0-1.8.6-3.5 1.7-4.9L3.5 3.5l4.6 2.2C9.5 5.1 10.7 5 12 5c1.3 0 2.5.1 3.9.7l4.6-2.2-2.2 4.6c1.1 1.4 1.7 3.1 1.7 4.9 0 4.418-3.582 8-8 8z"/><path d="M9 12h.01"/><path d="M15 12h.01"/><path d="M12 15l-1-1.5h2z"/></svg>'
svg_food = '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="color: var(--secondary);"><path d="M3 15h18a1 1 0 0 1 1 1v2a3 3 0 0 1-3 3H5a3 3 0 0 1-3-3v-2a1 1 0 0 1 1-1Z"/><path d="M6 15a6 6 0 0 1 12 0"/></svg>'
svg_puzzle = '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="color: var(--secondary); margin-right: 4px; vertical-align: middle;"><path d="M19.439 10a2.9 2.9 0 0 1 2.561 2.89 2.9 2.9 0 0 1-2.54 2.89M5 10a2.9 2.9 0 0 0-2.561 2.89A2.9 2.9 0 0 0 4.98 15.78M10 19.439a2.9 2.9 0 0 1 2.89 2.561 2.9 2.9 0 0 1 2.89-2.54M14 5a2.9 2.9 0 0 0-2.89-2.561A2.9 2.9 0 0 0 8.22 4.98M15 15H9V9h6z"/></svg>'
svg_envelope = '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="16" rx="2"/><path d="M22 6l-10 7L2 6"/></svg>'

# Emojis for SRS assess buttons
svg_smile = '<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--success)" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="margin-bottom: 2px;"><circle cx="12" cy="12" r="10"/><path d="M8 14s1.5 2 4 2 4-2 4-2"/><line x1="9" y1="9" x2="9.01" y2="9"/><line x1="15" y1="9" x2="15.01" y2="9"/></svg>'
svg_meh = '<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--warning)" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="margin-bottom: 2px;"><circle cx="12" cy="12" r="10"/><line x1="8" y1="15" x2="16" y2="15"/><line x1="9" y1="9" x2="9.01" y2="9"/><line x1="15" y1="9" x2="15.01" y2="9"/></svg>'
svg_frown = '<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--error)" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="margin-bottom: 2px;"><circle cx="12" cy="12" r="10"/><path d="M16 16s-1.5-2-4-2-4 2-4 2"/><line x1="9" y1="9" x2="9.01" y2="9"/><line x1="15" y1="9" x2="15.01" y2="9"/></svg>'

# Layout HTMLs
rich_header = """<div class="wf-header" style="justify-content: space-between !important; display: flex; width: 100%; align-items: center;">
    <!-- Logo -->
    <div style="display: flex; align-items: center; gap: 8px; font-family: var(--font-heading); font-weight: 800; font-size: 18px; color: var(--primary);">
        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="color: var(--secondary);"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>
        <span>DiveVerse</span>
    </div>
    <!-- Navigation Links -->
    <div style="display: flex; align-items: center; gap: 20px;">
        <span style="display: flex; align-items: center; gap: 6px; font-size: 13px; font-weight: 600; color: var(--primary); cursor: pointer;"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>Trang chủ</span>
        <span style="display: flex; align-items: center; gap: 6px; font-size: 13px; font-weight: 600; color: var(--text-secondary); cursor: pointer;"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09"/><path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"/><path d="M9 12a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.4 22.4 0 0 1-4 2z"/><path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 .05 5 .05"/></svg>Bài học</span>
        <span style="display: flex; align-items: center; gap: 6px; font-size: 13px; font-weight: 600; color: var(--text-secondary); cursor: pointer;"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 7v14"/><path d="M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z"/></svg>Từ điển</span>
    </div>
    <!-- Profile & Streak -->
    <div style="display: flex; align-items: center; gap: 14px;">
        <div style="display: flex; align-items: center; gap: 4px; background: #FFF5F5; border: 1px solid rgba(239, 68, 68, 0.15); padding: 4px 10px; border-radius: 9999px; font-size: 12px; font-weight: 700; color: #EF4444;">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3q1 4 4 6.5t3 5.5a1 1 0 0 1-14 0 5 5 0 0 1 1-3 1 1 0 0 0 5 0c0-2-1.5-3-1.5-5q0-2 2.5-4"/></svg>
            <span>3 ngày</span>
        </div>
        <div style="width: 32px; height: 32px; border-radius: 50%; background: #EAE5FF; border: 1.5px solid var(--primary); display: flex; align-items: center; justify-content: center; color: var(--primary); cursor: pointer;">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="10" r="3"/><path d="M7 20.662V19a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v1.662"/></svg>
        </div>
    </div>
</div>"""

rich_sidebar_uc5b = """<div class="wf-sidebar" style="display: flex; flex-direction: column; justify-content: flex-start; align-items: flex-start; padding: 24px 16px; gap: 8px; width: 180px;">
    <div style="font-size: 11px; text-transform: uppercase; font-weight: 700; color: var(--text-secondary); margin-bottom: 8px; padding-left: 8px; letter-spacing: 0.5px;">HỌC TẬP</div>
    
    <div style="display: flex; align-items: center; gap: 10px; width: 100%; padding: 10px 12px; border-radius: 12px; font-size: 13px; font-weight: 600; color: var(--text-secondary); cursor: pointer; transition: all 0.2s;">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"/><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09"/><path d="M9 12a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.4 22.4 0 0 1-4 2z"/><path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 .05 5 .05"/></svg>
        <span>Từ vựng</span>
    </div>
    
    <div style="display: flex; align-items: center; gap: 10px; width: 100%; padding: 10px 12px; border-radius: 12px; font-size: 13px; font-weight: 600; background: #F4F5FF; color: var(--primary); cursor: pointer;">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 7v14"/><path d="M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z"/></svg>
        <span>Ngữ pháp</span>
    </div>
    
    <div style="display: flex; align-items: center; gap: 10px; width: 100%; padding: 10px 12px; border-radius: 12px; font-size: 13px; font-weight: 600; color: var(--text-secondary); cursor: pointer; transition: all 0.2s;">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 14h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-7a9 9 0 0 1 18 0v7a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3"/></svg>
        <span>Luyện nghe</span>
    </div>
    
    <div style="display: flex; align-items: center; gap: 10px; width: 100%; padding: 10px 12px; border-radius: 12px; font-size: 13px; font-weight: 600; color: var(--text-secondary); cursor: pointer; transition: all 0.2s;">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><rect x="9" y="2" width="6" height="13" rx="3"/><path d="M12 19v3"/></svg>
        <span>Phát âm</span>
    </div>
    
    <div style="display: flex; align-items: center; gap: 10px; width: 100%; padding: 10px 12px; border-radius: 12px; font-size: 13px; font-weight: 600; color: var(--text-secondary); cursor: pointer; transition: all 0.2s;">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>
        <span>Thống kê</span>
    </div>
    
    <div style="height: 1px; background: rgba(155, 93, 224, 0.15); width: 100%; margin: 8px 0;"></div>
    
    <div style="display: flex; align-items: center; gap: 10px; width: 100%; padding: 10px 12px; border-radius: 12px; font-size: 13px; font-weight: 600; color: var(--text-secondary); cursor: pointer; transition: all 0.2s;">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.1a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/></svg>
        <span>Cài đặt</span>
    </div>
</div>"""

rich_sidebar_uc08 = """<div class="wf-sidebar" style="display: flex; flex-direction: column; justify-content: flex-start; align-items: flex-start; padding: 24px 16px; gap: 8px; width: 180px;">
    <div style="font-size: 11px; text-transform: uppercase; font-weight: 700; color: var(--text-secondary); margin-bottom: 8px; padding-left: 8px; letter-spacing: 0.5px;">HỌC TẬP</div>
    
    <div style="display: flex; align-items: center; gap: 10px; width: 100%; padding: 10px 12px; border-radius: 12px; font-size: 13px; font-weight: 600; color: var(--text-secondary); cursor: pointer; transition: all 0.2s;">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"/><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09"/><path d="M9 12a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.4 22.4 0 0 1-4 2z"/><path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 .05 5 .05"/></svg>
        <span>Từ vựng</span>
    </div>
    
    <div style="display: flex; align-items: center; gap: 10px; width: 100%; padding: 10px 12px; border-radius: 12px; font-size: 13px; font-weight: 600; color: var(--text-secondary); cursor: pointer; transition: all 0.2s;">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 7v14"/><path d="M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z"/></svg>
        <span>Ngữ pháp</span>
    </div>
    
    <div style="display: flex; align-items: center; gap: 10px; width: 100%; padding: 10px 12px; border-radius: 12px; font-size: 13px; font-weight: 600; background: #F4F5FF; color: var(--primary); cursor: pointer;">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
        <span>Ôn tập hôm nay</span>
        <span style="margin-left: auto; background: var(--secondary); color: #FFF; font-size: 10px; padding: 2px 8px; border-radius: 9999px; box-shadow: 0 2px 6px rgba(155, 93, 224, 0.2);">12</span>
    </div>
    
    <div style="height: 1px; background: rgba(155, 93, 224, 0.15); width: 100%; margin: 8px 0;"></div>
    
    <div style="display: flex; align-items: center; gap: 10px; width: 100%; padding: 10px 12px; border-radius: 12px; font-size: 13px; font-weight: 600; color: var(--text-secondary); cursor: pointer; transition: all 0.2s;">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>
        <span>Thống kê</span>
    </div>
    
    <div style="display: flex; align-items: center; gap: 10px; width: 100%; padding: 10px 12px; border-radius: 12px; font-size: 13px; font-weight: 600; color: var(--text-secondary); cursor: pointer; transition: all 0.2s;">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.1a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/></svg>
        <span>Cài đặt</span>
    </div>
</div>"""

rich_footer = """<div class="wf-footer" style="display: flex; align-items: center; justify-content: space-between; padding: 0 32px; width: 100%;">
    <span style="font-size: 12px; color: rgba(255,255,255,0.6);">© 2026 DiveVerse. Được thiết kế cho trải nghiệm học tập vũ trụ.</span>
    <div style="display: flex; gap: 16px; font-size: 12px;">
        <span style="color: rgba(255,255,255,0.6); cursor: pointer;">Trợ giúp</span>
        <span style="color: rgba(255,255,255,0.6); cursor: pointer;">Điều khoản</span>
        <span style="color: rgba(255,255,255,0.6); cursor: pointer;">Bảo mật</span>
    </div>
</div>"""

# Extract inners
def get_inner_html(html_str):
    first_gt = html_str.find('>')
    if first_gt == -1:
        return html_str
    last_div_close = html_str.rfind('</div>')
    if last_div_close == -1:
        return html_str[first_gt + 1:]
    return html_str[first_gt + 1:last_div_close].strip()

rich_header_inner = get_inner_html(rich_header)
rich_sidebar_uc5b_inner = get_inner_html(rich_sidebar_uc5b)
rich_sidebar_uc08_inner = get_inner_html(rich_sidebar_uc08)
rich_footer_inner = get_inner_html(rich_footer)

def robust_div_replace(html_content, class_name, is_uc5b):
    # Pattern to find div open tag containing the class_name
    pattern = re.compile(r'<div\s+[^>]*class=["\'][^"\']*(?:' + re.escape(class_name) + r')[^"\']*["\'][^>]*>')
    
    idx = 0
    while True:
        match = pattern.search(html_content, idx)
        if not match:
            break
            
        start_pos = match.start()
        open_tag = match.group(0)
        
        # Track nesting level of divs to find the correct matching closing tag
        nest_level = 0
        search_idx = start_pos
        end_pos = -1
        
        while search_idx < len(html_content):
            next_open = html_content.find("<div", search_idx)
            next_close = html_content.find("</div", search_idx)
            
            if next_open == -1 and next_close == -1:
                break
                
            if next_open != -1 and (next_close == -1 or next_open < next_close):
                nest_level += 1
                search_idx = next_open + 4
            else:
                nest_level -= 1
                search_idx = next_close + 6
                if nest_level == 0:
                    end_pos = search_idx
                    break
        
        if end_pos != -1:
            block_content = html_content[start_pos:end_pos]
            has_opacity = "opacity" in open_tag or "0.5" in open_tag
            
            # Form the new replacement block
            if class_name == "wf-header":
                if has_opacity:
                    rep = f'<div class="wf-header" style="justify-content: space-between !important; display: flex; width: 100%; align-items: center; opacity: 0.5;">{rich_header_inner}</div>'
                else:
                    rep = rich_header
            elif class_name == "wf-sidebar":
                inner = rich_sidebar_uc5b_inner if is_uc5b else rich_sidebar_uc08_inner
                if has_opacity:
                    rep = f'<div class="wf-sidebar" style="display: flex; flex-direction: column; justify-content: flex-start; align-items: flex-start; padding: 24px 16px; gap: 8px; width: 180px; opacity: 0.5;">{inner}</div>'
                else:
                    rep = rich_sidebar_uc5b if is_uc5b else rich_sidebar_uc08
            elif class_name == "wf-footer":
                if has_opacity:
                    rep = f'<div class="wf-footer" style="display: flex; align-items: center; justify-content: space-between; padding: 0 32px; width: 100%; opacity: 0.5;">{rich_footer_inner}</div>'
                else:
                    rep = rich_footer
            else:
                rep = block_content # Fallback
                
            html_content = html_content[:start_pos] + rep + html_content[end_pos:]
            idx = start_pos + len(rep)
        else:
            idx = start_pos + len(open_tag)
            
    return html_content

def main():
    # Step 1: Copy grayscale to target files to start completely fresh
    print("Step 1: Copying fresh grayscale prototypes...")
    shutil.copy(grayscale_uc5b, file_uc5b)
    shutil.copy(grayscale_uc08, file_uc08)
    
    # Step 2: Apply CSS High-Fidelity styles by running the CSS generator scripts
    print("Step 2: Applying CSS styles...")
    subprocess.run(["python", gen_uc5b_script], check=True)
    subprocess.run(["python", gen_uc08_script], check=True)
    
    # Step 3: Run the spelling clean script to make sure spelling is correct in all files
    print("Step 3: Cleaning Vietnamese spelling...")
    subprocess.run(["python", clean_vt_script], check=True)
    
    # Step 4: Run nesting-aware layout replacements on figma-uc5b.html
    print("Step 4: Running layout replacements for figma-uc5b.html...")
    with open(file_uc5b, "r", encoding="utf-8") as f:
        content_5b = f.read()
    
    content_5b = replace_layout_elements_robust(content_5b, is_uc5b=True)
    
    # Text level replacements for uc5b
    content_5b = re.sub(r'<div class="wf-progress-mini-label">\s*\[\s*(\d+%)\s*\]\s*</div>', r'<div class="wf-progress-mini-label">\1</div>', content_5b)
    content_5b = content_5b.replace('[ CAU MAU CAN PHAN TICH ]', 'Phân tích câu mẫu')
    content_5b = content_5b.replace('[ CAU MAU ]', 'Câu mẫu')
    content_5b = content_5b.replace('[ CHON ĐÁP ÁN ĐÚNG ]', 'Chọn đáp án đúng')
    content_5b = content_5b.replace('[ VUI LÒNG CHỌN ĐÁP ÁN ]', 'Vui lòng chọn đáp án')
    
    video_player_old = """                                    <div style="font-size: 13px; font-weight: bold; color: #555; margin-bottom: 6px;">[ KHU VUC PHÁT VIDEO ]</div>
                                    <div class="wf-placeholder-box" style="width: 48px; height: 48px; border-color: #555; color: #555; background: transparent;"><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="color: var(--primary); margin-left: 2px;"><polygon points="5 3 19 12 5 21 5 3"/></svg></div>"""
    
    video_player_new = """                                    <div style="font-family: var(--font-heading); font-size: 13px; font-weight: 800; color: rgba(255, 255, 255, 0.7); margin-bottom: 8px;">Video ngữ cảnh thực tế</div>
                                    <div class="wf-placeholder-box" style="width: 52px; height: 52px; border: none; background: rgba(255, 255, 255, 0.15); backdrop-filter: blur(4px); border-radius: 50%; color: #FFF; display: flex; align-items: center; justify-content: center; cursor: pointer; box-shadow: 0 4px 12px rgba(0,0,0,0.3); transition: all 0.2s;"><svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="currentColor" style="color: #FFF; margin-left: 2px;"><polygon points="5 3 19 12 5 21 5 3"/></svg></div>"""
    content_5b = content_5b.replace(video_player_old, video_player_new)

    video_done_old = """                                    <div style="font-size: 13px; color: #555; font-weight: bold;">[ ĐÃ PHÁT XONG ]</div>"""
    video_done_new = """                                    <div style="background: rgba(16, 185, 129, 0.15); border: 1.5px solid #10B981; border-radius: 50%; width: 44px; height: 44px; display: flex; align-items: center; justify-content: center; margin-bottom: 8px; color: #10B981; box-shadow: 0 0 12px rgba(16, 185, 129, 0.2);">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                                    </div>
                                    <div style="font-family: var(--font-heading); font-size: 13px; font-weight: 800; color: #10B981;">Đã phát xong</div>"""
    content_5b = content_5b.replace(video_done_old, video_done_new)

    content_5b = content_5b.replace('[ Lui ]', f'{svg_backward} Lùi')
    content_5b = content_5b.replace('[ Tam đúng ]', f'{svg_pause} Tạm dừng')
    content_5b = content_5b.replace('[ Ke tiep ]', f'Kế tiếp {svg_forward}')
    content_5b = content_5b.replace('[ Kế tiếp ]', f'Kế tiếp {svg_forward}')
    content_5b = content_5b.replace('[ Phát lai ]', f'{svg_replay} Phát lại')
    content_5b = content_5b.replace('[ Phát âm ]', 'Phát âm')

    content_5b = content_5b.replace('<div class="wf-error-text" style="margin-top: 4px;">[ OK ] Đúng pattern.</div>',
                                    '<div class="wf-success-text" style="margin-top: 4px; color: #10B981; display: flex; align-items: center; gap: 4px; font-weight: 600;"><svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>Đúng cấu trúc</div>')
    content_5b = content_5b.replace('[ OK ]', 'Hợp lệ')
    content_5b = content_5b.replace('[ ? ]', '<span style="background: rgba(155, 93, 224, 0.1); border: 1.5px dashed var(--primary); color: var(--primary); padding: 2px 8px; border-radius: 4px; font-weight: bold; font-family: monospace;">?</span>')
    content_5b = content_5b.replace('<span class="wf-puzzle-notch" style="font-size: 14px;">[=]</span>', f'<span class="wf-puzzle-notch" style="font-size: 14px; display: inline-flex; align-items: center; justify-content: center;">{svg_puzzle}</span>')

    content_5b = content_5b.replace('[ MAT MEO ]', f'{svg_cat}<span style="font-size: 11px; font-weight: 700; color: var(--primary);">Mèo con</span>')
    content_5b = content_5b.replace('[ THIA & THUC AN ]', f'{svg_food}<span style="font-weight:600; font-size:10px; color:var(--secondary);">Thức ăn</span>')

    content_5b = content_5b.replace('<div class="wf-feed-dot done">[ D ]</div>', f'<div class="wf-feed-dot done" style="display: inline-flex; align-items: center; justify-content: center;"><svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" style="color: #FFF;"><polyline points="20 6 9 17 4 12"/></svg></div>')
    content_5b = re.sub(r'<div class="wf-feed-dot([^>]*)">\s*\[\s*(\d+)\s*\]\s*</div>', r'<div class="wf-feed-dot\1">\2</div>', content_5b)

    content_5b = content_5b.replace('<span class="check">[X]</span>', f'<span class="check" style="color: var(--primary); font-weight: bold; display: inline-flex; align-items: center; justify-content: center;"><svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="vertical-align: middle;"><polyline points="20 6 9 17 4 12"/></svg></span>')
    content_5b = content_5b.replace('<span class="check">[ ]</span>', f'<span class="check" style="color: #BBB; display: inline-flex; align-items: center; justify-content: center;"><svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align: middle;"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/></svg></span>')

    content_5b = content_5b.replace('[ Tem<br>AI<br>Kiem ]', f'<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#10B981" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><polyline points="9 11 11 13 15 9"/></svg><span style="font-size: 8px; margin-top: 4px; color: #10B981; font-weight: bold; text-transform: uppercase;">AI OK</span>')
    content_5b = content_5b.replace('[ Whenever ]', 'Whenever')

    # Replace speaker, mouth, play icons in content
    svg_mouth = '<svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="color: var(--secondary);"><path d="M3 12a9 9 0 0 0 18 0"/><path d="M21 12H3"/><path d="M12 7c-2 0-3 1.5-3 1.5s1 1.5 3 1.5 3-1.5 3-1.5-1-1.5-3-1.5z"/><path d="M6 18h12"/></svg>'
    svg_speaker_c = '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="color: var(--primary);"><path d="M11 4.702a.705.705 0 0 0-1.203-.498L6.413 7.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.705.705 0 0 0 11 19.298z"/><path d="M16 9a5 5 0 0 1 0 6"/><path d="M19.364 18.364a9 9 0 0 0 0-12.728"/></svg>'
    content_5b = content_5b.replace('[ MIENG ]', svg_mouth)
    content_5b = content_5b.replace('[ LOA ]', svg_speaker_c)
    content_5b = content_5b.replace('[ Phát ]', svg_play)
    
    # Train icons
    svg_train_car_c = '<svg xmlns="http://www.w3.org/2000/svg" width="22" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="color: var(--secondary); vertical-align: middle;"><rect x="2" y="5" width="20" height="12" rx="2"/><circle cx="7" cy="19" r="2"/><circle cx="17" cy="19" r="2"/><path d="M9 19h6"/></svg>'
    content_5b = content_5b.replace('[===]', svg_train_car_c)
    content_5b = content_5b.replace('===\u003c/span\u003e', svg_train_car_c + '</span>')

    with open(file_uc5b, "w", encoding="utf-8") as f:
        f.write(content_5b)
    print("Completed processing figma-uc5b.html successfully.")

    # Step 5: Run nesting-aware layout replacements on figma-uc08.html
    print("Step 5: Running layout replacements for figma-uc08.html...")
    with open(file_uc08, "r", encoding="utf-8") as f:
        content_08 = f.read()
    
    content_08 = replace_layout_elements_robust(content_08, is_uc5b=False)

    # Text level replacements for uc08
    content_08 = re.sub(r'<div class="wf-progress-mini-label">\s*\[\s*(\d+\s*/\s*\d+)\s*\]\s*</div>', r'<div class="wf-progress-mini-label">\1</div>', content_08)
    content_08 = content_08.replace('[ Ôn tập hôm nay ]', 'Ôn tập hôm nay')
    content_08 = content_08.replace('[ Tu can on ]', 'never')
    content_08 = content_08.replace('[ never ]', 'never')

    # Yeu badge
    content_08 = content_08.replace('<div class="wf-srs-overview-item"><div class="num">1</div><div class="lbl">[ Yeu ]</div></div>',
                                    '<div class="wf-srs-overview-item" style="border-color: rgba(239, 68, 68, 0.2);"><div class="num" style="color: #EF4444;">1</div><div class="lbl" style="color: #EF4444; font-weight: bold;">Yếu</div></div>')
    content_08 = content_08.replace('[ Yeu ]', 'Yếu')

    content_08 = content_08.replace('<div class="badge">[ HOC LAI NHANH ]</div>',
                                    f'<div class="badge" style="background: #EF4444; color: #FFF; display: inline-flex; align-items: center; gap: 4px; padding: 4px 10px; border-radius: 9999px; font-weight: bold; font-size: 11px;">{svg_lightning} HỌC LẠI NHANH</div>')
    content_08 = content_08.replace('[ HOC LAI NHANH ]', f'{svg_lightning} Học lại nhanh')

    # Alerts
    content_08 = content_08.replace('[ Loi: Vui lòng chọn một đáp án trước khi nộp! ]',
                                    '<span style="display: inline-flex; align-items: center; gap: 4px; color: #EF4444;"><svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="vertical-align: middle;"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg> Lỗi: Bạn chưa chọn đáp án ở danh sách phía trên. Vui lòng nhấp chọn một đáp án trước khi bấm Nộp bài.</span>')

    content_08 = content_08.replace('[ Lỗi: Vui lòng đánh giá mức độ ghi nhớ của bạn trước khi tiếp tục! ]',
                                    '<span style="display: inline-flex; align-items: center; gap: 4px; color: #EF4444;"><svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="vertical-align: middle;"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg> Lỗi: Bạn chưa đánh giá mức độ ghi nhớ. Vui lòng chọn một trong các mức (Nhớ rõ, Phân vân, Quên mất) trước khi bấm Xác nhận đánh giá.</span>')

    # Buttons
    content_08 = content_08.replace('[ Bat dau ôn tập ]', f'{svg_play} Bắt đầu ôn tập')
    content_08 = content_08.replace('[ Ket thuc phien ]', f'{svg_close} Kết thúc phiên')
    content_08 = content_08.replace('[ Gợi ý ]', f'{svg_lightbulb} Gợi ý')
    content_08 = content_08.replace('[ Nộp ]', f'{svg_check} Nộp bài')
    content_08 = content_08.replace('[ Đã rõ, tiep tuc ]', f'Đã hiểu, tiếp tục {svg_forward}')
    content_08 = content_08.replace('[ Xác nhận danh gia ]', f'{svg_check} Xác nhận đánh giá')
    content_08 = content_08.replace('[ Có, kết thúc ]', f'{svg_check} Có, kết thúc')
    content_08 = content_08.replace('[ Không ]', f'{svg_close} Không')
    content_08 = content_08.replace('[ Về trang chủ ]', f'{svg_home} Về trang chủ')
    content_08 = content_08.replace('[ Học từ mới ]', f'{svg_plus} Học từ mới')
    content_08 = content_08.replace('[ Nghe lại ]', f'{svg_replay} Nghe lại')
    content_08 = content_08.replace('[ Tra loi ]', 'Trả lời')
    content_08 = content_08.replace('[ Muc tiep theo ]', f'Mục tiếp theo {svg_forward}')

    # Play & Speaker in uc08
    content_08 = content_08.replace('[ .mp3 ]', svg_replay)
    content_08 = content_08.replace('[ Phát ]', svg_play)

    # Insert emotionally expressive icons into SRS assess buttons
    content_08 = re.sub(r'(<div class="wf-srs-assess-btn good">)', rf'\1\n                                {svg_smile}', content_08)
    content_08 = re.sub(r'(<div class="wf-srs-assess-btn ok">)', rf'\1\n                                {svg_meh}', content_08)
    content_08 = re.sub(r'(<div class="wf-srs-assess-btn bad">)', rf'\1\n                                {svg_frown}', content_08)

    with open(file_uc08, "w", encoding="utf-8") as f:
        f.write(content_08)
    print("Completed processing figma-uc08.html successfully.")

    # Step 6: Run layout restructuring script on final generated files
    print("Step 6: Running layout restructuring on all prototypes...")
    try:
        import restructure_layouts
        restructure_layouts.main()
    except Exception as e:
        print(f"Error running layout restructuring: {e}")

    # Step 7: Run visual style and accent correction script on all final prototypes
    print("Step 7: Running final visual style and accent corrections...")
    try:
        sys.path.append(r"C:\Users\thaor\.gemini\antigravity-ide\brain\d19916ff-803a-48f7-b0eb-20f3bcdee2fd\scratch")
        import fix_visual_and_accents
        fix_visual_and_accents.fix_all_files()
    except Exception as e:
        print(f"Error running final visual and accent fixes: {e}")

def replace_layout_elements_robust(content, is_uc5b):
    content = robust_div_replace(content, "wf-header", is_uc5b)
    content = robust_div_replace(content, "wf-sidebar", is_uc5b)
    content = robust_div_replace(content, "wf-footer", is_uc5b)
    return content

if __name__ == "__main__":
    main()
