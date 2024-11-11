import BreadCrumb from '@/components/ui/breadcrumb';

const getDevSection = () => {
  return (
    <section id="dev" className="service">
      <h3>開発/構築</h3>
      <p className='font-thin'>WEB系を中心に開発や構築を請け負っております。<br />
        社内システムからモバイルアプリ開発、WEBサイト作成はもとより、WEBサイトの一部機能構築やボット開発といったピンポイントなものまで規模の大小問わず対応しております。</p>

      <h4>主な制作実績</h4>
      <ul className='result font-thin'>
        <li>会計システム構築(iDempiereカスタマイズ)</li>
        <li>特殊計算システム</li>
        <li>MT4, MT5カスタムインジケーター</li>
        <li>アニメーションWEBサイト組み込み</li>
        <li>ECサイト構築</li>
      </ul>
    </section>
  )
}

const getDesignSection = () => {
  return (
    <section id="design" className="service">
      <h3>デザイン</h3>
      <p className='font-thin'>主にWEBデザインやロゴデザインから、名刺、フライヤーなど紙媒体のデザインまで対応可能です。</p>

      <h4>主な制作実績</h4>
      <ul className='result font-thin'>
        <li>飲食店様ホームページデザイン</li>
        <li>ロゴデザイン</li>
        <li>イベントポスター・チケットデザイン</li>
        <li>名刺デザイン</li>
      </ul>
    </section>
  )
}

const getBlockchainSection = () => {
  return (
    <section id="blockchain" className="service">
      <h3>ブロックチェーン</h3>
      <p className='font-thin'>2018年よりブロックチェーン開発に関わっており、アドバイザーとしての立場での参画もしております。<br />
        ブロックチェーンを導入したいが何をどう活用すればいいかわからない。そのような企業様のご支援も致しております。</p>

      <h4>主な実績</h4>
      <ul className='result font-thin'>
        <li>カンファレンス開催</li>
        <li>各種業界アドバイザー</li>
        <li>NFT発行</li>
      </ul>
    </section>
  )
}

export default function Page() {
  return (
    <div className='px-[10px] lg:px-[0px] w-100p lg:w-960 m-auto'>
      <BreadCrumb path="/services" />
      <div className='services'>
        {getDevSection()}
        {getDesignSection()}
        {getBlockchainSection()}
      </div>
    </div>
  )
}