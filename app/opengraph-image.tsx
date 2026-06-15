import { ImageResponse } from 'next/og';
import { join } from 'node:path';
import { readFile } from 'node:fs/promises';

export const alt = "Howlfox Academy — Kerala's Best Skill Learning Platform";
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function Image() {
  const logoData = await readFile(
    join(process.cwd(), 'public/images/logo/howlfoxlogoforweb.png'),
    'base64'
  );
  const logoSrc = `data:image/png;base64,${logoData}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          background: 'linear-gradient(135deg, #0a0a0f 0%, #13111f 60%, #1a1230 100%)',
          padding: '0 80px',
          fontFamily: 'sans-serif',
        }}
      >
        {/* Purple glow blob */}
        <div
          style={{
            position: 'absolute',
            top: '-100px',
            right: '200px',
            width: '500px',
            height: '500px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(79,70,229,0.25) 0%, transparent 70%)',
            display: 'flex',
          }}
        />

        {/* Left: Logo + badge */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '20px' }}>
          <img src={logoSrc} width={160} height={160} style={{ borderRadius: '28px' }} />
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              background: 'rgba(79,70,229,0.2)',
              border: '1px solid rgba(79,70,229,0.5)',
              borderRadius: '100px',
              padding: '8px 20px',
            }}
          >
            <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#6d63f5', display: 'flex' }} />
            <span style={{ color: '#a5b4fc', fontSize: '18px', fontWeight: 600 }}>A HowlFox Initiative</span>
          </div>
        </div>

        {/* Right: Text */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-end',
            maxWidth: '640px',
            gap: '16px',
          }}
        >
          <span
            style={{
              fontSize: '62px',
              fontWeight: 800,
              color: '#ffffff',
              lineHeight: 1.1,
              textAlign: 'right',
              letterSpacing: '-1px',
            }}
          >
            Howlfox Academy
          </span>
          <span
            style={{
              fontSize: '26px',
              color: '#a5b4fc',
              fontWeight: 500,
              textAlign: 'right',
              lineHeight: 1.4,
            }}
          >
            Kerala's Best Skill Learning Platform
          </span>
          <div style={{ display: 'flex', gap: '12px', marginTop: '8px' }}>
            {['Digital Marketing', 'UI/UX', 'Photography'].map((tag) => (
              <div
                key={tag}
                style={{
                  display: 'flex',
                  background: 'rgba(255,255,255,0.07)',
                  border: '1px solid rgba(255,255,255,0.12)',
                  borderRadius: '8px',
                  padding: '6px 16px',
                  color: '#e2e8f0',
                  fontSize: '16px',
                  fontWeight: 500,
                }}
              >
                {tag}
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
