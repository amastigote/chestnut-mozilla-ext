// Generated by CoffeeScript 1.12.7
(function() {
  var siteMap;

  siteMap = {
    v2ex: ['v2ex.com/', ' - V2EX'],
    csdnblog: ['blog.csdn.net/', ' - CSDN博客'],
    csdnnet: ['www.csdn.net/', '-CSDN.NET'],
    cnblogs: ['cnblogs.com/', ' - 博客园'],
    stackoverflow: ['stackoverflow.com/', ' - Stack Overflow'],
    oschina: ['oschina.net/', ' - 开源中国社区'],
    freebuf: ['freebuf.com/', ' - FreeBuf.COM | 关注黑客与极客'],
    _51cto: ['blog.51cto.com/', ' - 51CTO技术博客'],
    _163blog: ['blog.163.com/', ' - 网易博客'],
    sinablog: ['blog.sina.com.cn/', '_新浪博客'],
    chinaunix: ['blog.chinaunix.net/', '-ChinaUnix博客'],
    iteye: ['iteye.com/', ' - ITeye博客'],
    juejin: ['juejin.im/', ' - 掘金'],
    zhihu: ['zhihu.com/', ' - 知乎'],
    jianshu: ['jianshu.com/', ' - 简书'],
    jobbole: ['blog.jobbole.com/', ' - 文章 - 伯乐在线']
  };

  this.removeSuffix = function(url, title) {
    var i, key, keys, len;
    keys = Object.getOwnPropertyNames(siteMap);
    for (i = 0, len = keys.length; i < len; i++) {
      key = keys[i];
      if (url.indexOf(siteMap[key][0]) !== -1) {
        return title.replace(siteMap[key][1], '');
      }
    }
    return title;
  };

}).call(this);
