---
title: お問い合わせ
permalink: /contact/
description: はじめての資産運用ノートへのお問い合わせはこちらから。
---

当サイトへのご意見・ご質問、記事の誤りのご指摘などは、以下からお気軽にご連絡ください。

{% if site.contact_form_url != "" %}
<div class="cta"><a href="{{ site.contact_form_url }}" target="_blank" rel="noopener">お問い合わせフォームを開く</a></div>
{% endif %}
{% if site.contact_email != "" %}
メールでのお問い合わせ：<a href="mailto:{{ site.contact_email }}">{{ site.contact_email }}</a>
{% endif %}
{% if site.contact_form_url == "" and site.contact_email == "" %}
<p class="box caution">お問い合わせ窓口は現在準備中です。</p>
{% endif %}

なお、個別の銘柄や投資判断に関するご相談にはお答えできません。あらかじめご了承ください。いただいた個人情報の取り扱いについては、[プライバシーポリシー]({{ '/privacy-policy/' | relative_url }})をご覧ください。
