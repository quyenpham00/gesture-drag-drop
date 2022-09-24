import React from 'react'

const items = [
  'save item',
  'open item',
  'share item',
  'delete item',
  'cancel',
  'save item',
  'open item',
  'share item',
  'delete item',
  'cancel',
  'save item',
  'open item',
  'share item',
  'delete item',
  'cancel',
  'save item',
  'open item',
  'share item',
  'delete item',
  'cancel',
]
export default function Content1() {
  return (
    <div style={{ overflow: 'auto', height: 'inherit' }}>
      {items.map((entry, i) => (
        <div style={{ marginTop: '15px' }} key={i} children={entry} />
      ))}
    </div>
  )
}
