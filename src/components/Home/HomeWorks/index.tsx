import WorkCard from "./WorkCard";

export const HomeWorks = () => {
  return (
    <section className="text-center">
      <div className="m-auto w-100p lg:w-960 px-[10px] py-[15px] text-left md:py-[30px] lg:py-50 lg:px-0">
        <h2 className="mb-3 text-2xl text-color-primary md:text-3xl lg:text-4xl">Works</h2>
        <div className="work-card grid grid-cols-6 gap-3">
          <WorkCard
            id='dev'
            title="開発/構築"
            items={["Web", "App", "Bot"]}
            link="/services/#dev"
            class={["font-thin col-start-1", "col-end-4", "lg:col-end-3"]}
            image='/workcard/code.svg'
          />
          <WorkCard
            id='design'
            title="デザイン"
            items={["Web", "Logo", "Flyer"]}
            link="/services/#design"
            class={["font-thin col-start-4", "col-end-7", "lg:col-start-3", "lg:col-end-5"]}
            image='/workcard/design.svg'
          />
          <WorkCard
            id='blockchain'
            title="ブロックチェーン"
            items={["Blockchain", "NFT", "DAO"]}
            link="/services/#blockchain"
            class={["font-thin col-start-1", "col-end-4", "lg:col-start-5", "lg:col-end-7"]}
            image='/workcard/blockchain.svg'
          />
          <WorkCard
            id='game'
            title="ゲーム開発"
            items={["2022年12月始動", "\"ゲーム開発プロジェクトの発足で\n新規ゲームチームの構築を開始\""]}
            class={["font-thin col-start-4", "col-end-7", "lg:col-start-1", "lg:col-end-7", "md:whitespace-pre-line", "lg:whitespace-normal"]}
            image='/workcard/game.svg'
          />
        </div>
      </div>
    </section>

  )
}
