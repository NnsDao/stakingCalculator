import React from "react"
import Accordion from "@material-ui/core/Accordion"
import AccordionSummary from "@material-ui/core/AccordionSummary"
import AccordionDetails from "@material-ui/core/AccordionDetails"
import ExpandMoreIcon from "@material-ui/icons/ExpandMore"
import { ArrowBackIos, ExpandLess, ExpandMore } from "@material-ui/icons"
import { navigate } from "gatsby-link"
import { useState } from "react"
import { Collapse } from "@material-ui/core"

const FAQBanner = () => {
  return (
    <div className="bg-white flex flex-row shadow-md">
      <ArrowBackIos className="m-6" onClick={() => navigate("/")} />
      <div className="font-semibold text-xl p-5 text-center">常见问题</div>
    </div>
  )
}

const FAQItem = (props: { title: string; content: JSX.Element }) => {
  const [open, setOpen] = useState<boolean>(false)

  return (
    <div className="bg-white max-w-lg lg:max-w-4xl m-5 lg:mx-auto rounded-lg shadow-lg">
      <div className="flex flex-row p-4 cursor-pointer" onClick={() => setOpen(!open)}>
        <div className="font-bold">{props.title}</div>
        <div className="ml-auto">{open ? <ExpandLess /> : <ExpandMore />}</div>
      </div>
      <Collapse in={open} timeout="auto">
        <div className="p-5">{props.content}</div>
      </Collapse>
    </div>
  )
}

const FAQ = () => {
  return (
    <div>
      <FAQBanner></FAQBanner>
      {faqItems.map(faqItem => {
        return <FAQItem title={faqItem.title} content={faqItem.content}></FAQItem>
      })}
    </div>
  )
}

const faqItems = [
  {
    title: "什么是神经网络?",
    content: (
      <div>
        网络神经系统 (NNS) 是管理 Internet 计算机网络的管理协议。参与者可以通过质押他们的 ICP
        代币并对改进网络的提案进行投票来获得奖励。 要了解更多信息，&nbsp;
        <a className="text-blue no-underline hover:underline" href="https://dfinity.org/faq">
          请访问 DFINITY 官方网站。
        </a>
      </div>
    ),
  },
  {
    title: "什么是神经元?",
    content: (
      <div>
        一个神经元代表可以对提案进行投票的质押数量的
        ICP。ICP质押越多，您获得的投票奖励就越多，您的投票权重就越大。一个神经元可以被配置为跟随其他神经元的投票。
      </div>
    ),
  },
  {
    title: "质押计算器给出的回报是否有保证?",
    content: (
      <div>
        不，有多个未知因素，包括将被质押的代币总数，神经元的平均成熟度，以及 ICP
        的总供应量。您可以在高级设置中处理这些因素。
      </div>
    ),
  },
  {
    title: "哪里有教程可以参与质押并获得ICP奖励",
    content: (
      <div>
        <p>您可以通过以下方式获得教程,关注Up主 KK德米安的bilibili 、 youtube 等频道查看简单的教学。 </p>
        <br />
        <a className="text-blue mx-5" href="https://www.youtube.com/channel/UCPcJwyUsglXbZggwdxLk4Qw">
          订阅Youtube频道{" "}
        </a>
        <a className="text-blue mx-5" href="https://space.bilibili.com/2766821">
          订阅Bilibili频道
        </a>
      </div>
    ),
  },
  {
    title: "如何注册ICP的NNS账户并参与质押",
    content: (
      <div>
        <p>访问以下链接直接观察视频,15分钟搞定ICP账户注册问题。 </p>
        <br />
        <a className="text-blue mx-5" href="https://www.youtube.com/watch?v=xpH1IwZP3qQ">
          查看Youtube讲解{" "}
        </a>
        <a className="text-blue mx-5" href="https://www.bilibili.com/video/BV15B4y1g71X">
          查看Bilibili视频讲解
        </a>
      </div>
    ),
  },
  {
    title: "如何解决安卓设备注册ICP账户闪退问题",
    content: (
      <div>
        <p>方案一:换为苹果设备 </p>
        <p>方案二:买yubikey通过NFC模式直接注册,以下为视频教程 </p>
        <br />
        <a className="text-blue mx-5" href="https://www.youtube.com/watch?v=xpH1IwZP3qQ">
          查看Youtube讲解{" "}
        </a>
        <a className="text-blue mx-5" href="https://www.bilibili.com/video/BV15B4y1g71X">
          查看Bilibili视频讲解
        </a>
      </div>
    ),
  },
  {
    title: "什么是质押币大小？",
    content: <div>质押币大小输入字段是您锁定到神经元中的 ICP 数量。您锁定的越多，您拥有的投票权就越大。</div>,
  },
  {
    title: "输入开始日期字段是什么?",
    content: <div>开始日期输入字段是您将 ICP 锁定在神经元中的日期。此日期越接近创世日期，您最初获得的奖励就越高。</div>,
  },
  {
    title: "什么是质押期输入框",
    content: (
      <div>
        这是您想要质押 ICP 的时期。它决定了您何时将神经元置于溶解模式。 例如，如果您有 3 年的质押期和 1
        年的溶解延迟，那么计算器将在 2 年后开始溶解您的神经元，使您的总质押期为 3 年。
      </div>
    ),
  },
  {
    title: "什么是溶解延迟输入字段? ",
    content: (
      <div>
        {" "}
        溶解延迟输入字段设置神经元的溶解延迟参数。这是您在触发神经元溶解后再次访问 ICP 之前必须等待的解锁时间。
      </div>
    ),
  },
  {
    title: "高级设置中投票神经元锁定的百分比是什么意思？ ",
    content: (
      <div>
        这是网络上锁定在投票神经元内的代币总供应量的百分比。神经元内部锁定的 ICP 越多，每个神经元获得的奖励就越少。
      </div>
    ),
  },
  {
    title: "高级设置中投票的提案百分比是啥?",
    content: (
      <div>
        这表明您投票的所有提案在提交给网络神经系统的所有提案中所占的百分比。这将以线性方式影响您的奖励，这意味着如果您对
        90% 的提案进行投票， 您将获得总可能奖励的 90%。请注意，可以将神经元配置为通过“跟随”其他神经元来自动投票。
      </div>
    ),
  },
  {
    title: "高级设置中“平均神经元年龄”是什么意思?",
    content: (
      <div>
        这表明您认为网络神经系统上所有神经元的平均年龄将是多少。神经元的年龄取决于它存在的时间以及它是否已经触发了溶解延迟。
        如果平均神经元年龄高于您自己的神经元，您将获得相对较少的奖励，而如果您的神经元年龄较大，您将获得更多收入。
      </div>
    ),
  },
  {
    title: "高级设置中平均溶解延迟是什么意思？",
    content: (
      <div>
        这表明您认为网络神经系统上所有神经元的平均溶解延迟将是多少。神经元的解散延迟决定了其所有者在选择解散神经元后必须等待多长时间才能撤回锁定的
        ICP 代币。 具有更高溶解延迟的神经元获得更大的奖励。神经元的溶解延迟最长可设置为 8 年。
      </div>
    ),
  },
]

export default FAQ
