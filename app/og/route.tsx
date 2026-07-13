import { ImageResponse } from 'next/og'
import { NextRequest } from 'next/server'
import { getProject } from '@/lib/projects'

export const runtime = 'edge'

const PLUM = '#5e3144'
const PINK = '#f1e4e9'
const MUSTARD = '#ffd400'
const TEAL = '#235d5a'

export async function GET(req: NextRequest) {
  const { searchParams, origin } = req.nextUrl
  const fontData = await fetch(
    new URL('./Fraunces-Bold.ttf', import.meta.url)
  ).then((res) => res.arrayBuffer())

  const slug = searchParams.get('slug')
  const project = slug ? getProject(slug) : undefined
  const title =
    project?.name ?? searchParams.get('title') ?? 'Ronneil Petterson'
  const kicker =
    (project ? 'Case study' : searchParams.get('kicker')) ??
    'Agent-native engineering leader'

  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          backgroundColor: PLUM,
          color: PINK,
          fontFamily: 'Fraunces',
          padding: 64
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            flexGrow: 1,
            width: project ? 560 : 1072
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 14,
              fontSize: 26,
              letterSpacing: 6,
              textTransform: 'uppercase',
              color: MUSTARD
            }}
          >
            <div
              style={{
                width: 14,
                height: 14,
                borderRadius: 999,
                backgroundColor: MUSTARD,
                display: 'flex'
              }}
            />
            {kicker}
          </div>
          <div
            style={{
              display: 'flex',
              fontSize: project ? 84 : 108,
              lineHeight: 1.02,
              letterSpacing: '-0.02em'
            }}
          >
            {title}
          </div>
          <div style={{ display: 'flex', fontSize: 28, color: '#d3abbb' }}>
            beforeoafterm-io.vercel.app
          </div>
        </div>
        {project ? (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              width: 460
            }}
          >
            <img
              src={`${origin}${project.coverImageSrc}`}
              alt=""
              width={440}
              height={275}
              style={{
                width: 440,
                height: 275,
                objectFit: 'cover',
                borderRadius: 28,
                border: `3px solid ${TEAL}`,
                transform: 'rotate(2deg)'
              }}
            />
          </div>
        ) : null}
      </div>
    ),
    {
      width: 1200,
      height: 630,
      fonts: [
        {
          name: 'Fraunces',
          data: fontData,
          style: 'normal',
          weight: 700
        }
      ]
    }
  )
}
