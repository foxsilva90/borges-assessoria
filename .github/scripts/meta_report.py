import os
import requests
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from datetime import datetime, timedelta

TOKEN = os.environ["META_TOKEN"]
AD_ACCOUNT = "act_2534496703434722"
CAMPAIGN_ID = "120252337530160110"

def get_insights():
    url = f"https://graph.facebook.com/v20.0/{AD_ACCOUNT}/insights"
    params = {
        "fields": "ad_name,spend,clicks,impressions,cpc,ctr,reach",
        "date_preset": "yesterday",
        "level": "ad",
        "filtering": f'[{{"field":"campaign.id","operator":"EQUAL","value":"{CAMPAIGN_ID}"}}]',
        "access_token": TOKEN,
    }
    r = requests.get(url, params=params)
    r.raise_for_status()
    return r.json().get("data", [])

def get_campaign_status():
    url = f"https://graph.facebook.com/v20.0/{CAMPAIGN_ID}"
    params = {"fields": "name,status,effective_status", "access_token": TOKEN}
    r = requests.get(url, params=params)
    r.raise_for_status()
    return r.json()

def fmt_brl(value):
    try:
        return f"R$ {float(value):.2f}".replace(".", ",")
    except (ValueError, TypeError):
        return "—"

def fmt_pct(value):
    try:
        return f"{float(value):.2f}%".replace(".", ",")
    except (ValueError, TypeError):
        return "—"

def build_html(ads, campaign, yesterday):
    total_spend = sum(float(a.get("spend", 0)) for a in ads)
    total_clicks = sum(int(a.get("clicks", 0)) for a in ads)
    total_impressions = sum(int(a.get("impressions", 0)) for a in ads)
    total_reach = sum(int(a.get("reach", 0)) for a in ads)

    status_map = {
        "ACTIVE": ("🟢", "Ativa"),
        "PAUSED": ("⏸️", "Pausada"),
        "DISAPPROVED": ("🔴", "Reprovada"),
        "IN_PROCESS": ("🔄", "Em processo"),
    }
    status_icon, status_label = status_map.get(
        campaign.get("effective_status", ""), ("⚪", campaign.get("effective_status", "—"))
    )

    rows = ""
    for ad in ads:
        name = ad.get("ad_name", "—")
        spend = float(ad.get("spend", 0))
        clicks = int(ad.get("clicks", 0))
        impressions = int(ad.get("impressions", 0))
        cpc = fmt_brl(ad.get("cpc"))
        ctr = fmt_pct(ad.get("ctr"))

        # highlight best performer (most clicks)
        bg = "#fffbf0" if clicks == max(int(a.get("clicks", 0)) for a in ads) and clicks > 0 else "#ffffff"

        rows += f"""
        <tr style="background:{bg}">
            <td style="padding:12px 10px;border-bottom:1px solid #f0ebe0;font-size:13px">{name}</td>
            <td style="padding:12px 10px;border-bottom:1px solid #f0ebe0;text-align:center;font-weight:600">R$ {spend:.2f}</td>
            <td style="padding:12px 10px;border-bottom:1px solid #f0ebe0;text-align:center">{clicks}</td>
            <td style="padding:12px 10px;border-bottom:1px solid #f0ebe0;text-align:center">{impressions:,}</td>
            <td style="padding:12px 10px;border-bottom:1px solid #f0ebe0;text-align:center">{cpc}</td>
            <td style="padding:12px 10px;border-bottom:1px solid #f0ebe0;text-align:center">{ctr}</td>
        </tr>"""

    if not ads:
        rows = '<tr><td colspan="6" style="padding:24px;text-align:center;color:#999;font-size:13px">Nenhum dado — campanha estava pausada ou sem veiculação ontem.</td></tr>'

    return f"""<!DOCTYPE html>
<html><head><meta charset="utf-8"></head>
<body style="margin:0;padding:0;background:#f5f5f5;font-family:Arial,sans-serif">
<table width="100%" cellpadding="0" cellspacing="0" style="max-width:680px;margin:0 auto">

  <!-- Header -->
  <tr><td style="background:#1C0F07;padding:28px 32px">
    <p style="margin:0;color:#C4933A;font-size:11px;letter-spacing:4px;text-transform:uppercase">Borges Assessoria</p>
    <h1 style="margin:8px 0 4px;color:#fff;font-size:28px;font-style:italic;font-weight:400">Relatório de Anúncios</h1>
    <p style="margin:0;color:rgba(255,255,255,0.5);font-size:13px">{yesterday} · Campanha: {campaign.get("name","—")}</p>
  </td></tr>

  <!-- Status bar -->
  <tr><td style="background:#C4933A;padding:10px 32px">
    <p style="margin:0;color:#fff;font-size:13px">Status da campanha: <strong>{status_icon} {status_label}</strong></p>
  </td></tr>

  <!-- Summary cards -->
  <tr><td style="padding:24px 32px;background:#fff">
    <table width="100%" cellpadding="0" cellspacing="0">
      <tr>
        <td width="25%" style="padding-right:12px">
          <div style="background:#f5f0e8;padding:16px;border-left:3px solid #C4933A">
            <p style="margin:0;font-size:10px;color:#999;text-transform:uppercase;letter-spacing:1px">Gasto</p>
            <p style="margin:6px 0 0;font-size:22px;font-weight:700;color:#1C0F07">R$ {total_spend:.2f}</p>
          </div>
        </td>
        <td width="25%" style="padding-right:12px">
          <div style="background:#f5f0e8;padding:16px;border-left:3px solid #C4933A">
            <p style="margin:0;font-size:10px;color:#999;text-transform:uppercase;letter-spacing:1px">Cliques</p>
            <p style="margin:6px 0 0;font-size:22px;font-weight:700;color:#1C0F07">{total_clicks}</p>
          </div>
        </td>
        <td width="25%" style="padding-right:12px">
          <div style="background:#f5f0e8;padding:16px;border-left:3px solid #C4933A">
            <p style="margin:0;font-size:10px;color:#999;text-transform:uppercase;letter-spacing:1px">Impressões</p>
            <p style="margin:6px 0 0;font-size:22px;font-weight:700;color:#1C0F07">{total_impressions:,}</p>
          </div>
        </td>
        <td width="25%">
          <div style="background:#f5f0e8;padding:16px;border-left:3px solid #C4933A">
            <p style="margin:0;font-size:10px;color:#999;text-transform:uppercase;letter-spacing:1px">Alcance</p>
            <p style="margin:6px 0 0;font-size:22px;font-weight:700;color:#1C0F07">{total_reach:,}</p>
          </div>
        </td>
      </tr>
    </table>
  </td></tr>

  <!-- Ads table -->
  <tr><td style="padding:0 32px 24px;background:#fff">
    <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse">
      <thead>
        <tr style="background:#f5f0e8">
          <th style="padding:10px;text-align:left;font-size:11px;text-transform:uppercase;color:#999;font-weight:600">Anúncio</th>
          <th style="padding:10px;text-align:center;font-size:11px;text-transform:uppercase;color:#999;font-weight:600">Gasto</th>
          <th style="padding:10px;text-align:center;font-size:11px;text-transform:uppercase;color:#999;font-weight:600">Cliques</th>
          <th style="padding:10px;text-align:center;font-size:11px;text-transform:uppercase;color:#999;font-weight:600">Impressões</th>
          <th style="padding:10px;text-align:center;font-size:11px;text-transform:uppercase;color:#999;font-weight:600">CPC</th>
          <th style="padding:10px;text-align:center;font-size:11px;text-transform:uppercase;color:#999;font-weight:600">CTR</th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
    <p style="margin:12px 0 0;font-size:11px;color:#bbb">⭐ Linha destacada = melhor desempenho do dia</p>
  </td></tr>

  <!-- Footer -->
  <tr><td style="background:#1C0F07;padding:20px 32px;text-align:center">
    <p style="margin:0;color:rgba(255,255,255,0.4);font-size:11px">
      Borges Assessoria Imobiliária · CRECI 40466 · Relatório automático via GitHub Actions
    </p>
  </td></tr>

</table>
</body></html>"""

def send_email(subject, html):
    msg = MIMEMultipart("alternative")
    msg["Subject"] = subject
    msg["From"] = os.environ["GMAIL_USER"]
    msg["To"] = os.environ["REPORT_EMAIL"]
    msg.attach(MIMEText(html, "html", "utf-8"))

    with smtplib.SMTP_SSL("smtp.gmail.com", 465) as server:
        server.login(os.environ["GMAIL_USER"], os.environ["GMAIL_APP_PASSWORD"])
        server.sendmail(os.environ["GMAIL_USER"], os.environ["REPORT_EMAIL"], msg.as_string())

if __name__ == "__main__":
    yesterday = (datetime.now() - timedelta(days=1)).strftime("%d/%m/%Y")

    ads = get_insights()
    campaign = get_campaign_status()

    total_spend = sum(float(a.get("spend", 0)) for a in ads)
    total_clicks = sum(int(a.get("clicks", 0)) for a in ads)

    subject = f"📊 Meta Ads {yesterday} | Gasto: R$ {total_spend:.2f} | {total_clicks} cliques"
    html = build_html(ads, campaign, yesterday)

    send_email(subject, html)
    print(f"Relatório enviado: {subject}")
