export interface Mattress {
  name: string;
  size: string;
  price: number;
  status: number;
  sku: number;
  quantity: number;
}

export const data: Mattress[] = [
  {"quantity": 2, "name": "GF35 OSELVA", "size": "90x200", "price": 7000, "status": 11, "sku": 3228232},
  {"quantity": 1, "name": "GF35 OSELVA", "size": "160x200", "price": 13000, "status": 11, "sku": 3228278},
  {"quantity": 2, "name": "GF110 HOVDA", "size": "80x200", "price": 11000, "status": 41, "sku": 3260423},
  {"quantity": 2, "name": "GF110 HOVDA", "size": "90x200", "price": 12000, "status": 41, "sku": 3260432},
  {"quantity": 1, "name": "GF110 HOVDA", "size": "140x200", "price": 19000, "status": 41, "sku": 3260457},
  {"quantity": 1, "name": "GF120 VENDO", "size": "90x200", "price": 13000, "status": 41, "sku": 3260832},
  {"quantity": 2, "name": "GF120 VENDO", "size": "160x200", "price": 23000, "status": 12, "sku": 3260878},
  {"quantity": 1, "name": "GF30 GLOMMA", "size": "80x200", "price": 5500, "status": 41, "sku": 3262323},
  {"quantity": 2, "name": "GF30 GLOMMA", "size": "90x200", "price": 6000, "status": 11, "sku": 3262332},
  {"quantity": 3, "name": "GF30 GLOMMA", "size": "160x200", "price": 11000, "status": 11, "sku": 3262378},
  {"quantity": 2, "name": "PS25 STRIA", "size": "160x200", "price": 7250, "status": 11, "sku": 3264378},
  {"quantity": 4, "name": "BS25 BANELVA", "size": "90x200", "price": 2250, "status": 11, "sku": 3269632},
  {"quantity": 2, "name": "BS25 BANELVA", "size": "140x200", "price": 3500, "status": 41, "sku": 3269657},
  {"quantity": 2, "name": "BS25 BANELVA", "size": "160x200", "price": 4000, "status": 11, "sku": 3269678},
  {"quantity": 1, "name": "PF100 HULDA", "size": "90x200", "price": 4000, "status": 11, "sku": 3269832},
  {"quantity": 1, "name": "PF100 HULDA", "size": "140x200", "price": 6400, "status": 41, "sku": 3269857},
  {"quantity": 3, "name": "PF100 HULDA", "size": "160x200", "price": 7200, "status": 11, "sku": 3269878},
  {"quantity": 1, "name": "SIBILLA ВП", "size": "90x200", "price": 1250, "status": 11, "sku": 3271432},
  {"quantity": 1, "name": "PF95 TENLA", "size": "80x200", "price": 4000, "status": 41, "sku": 3333723},
  {"quantity": 1, "name": "PS20 TRESA", "size": "80x190", "price": 3250, "status": 41, "sku": 3341822},
  {"quantity": 2, "name": "PS20 TRESA", "size": "90x200", "price": 3500, "status": 41, "sku": 3341832},
  {"quantity": 1, "name": "PS55 USMA", "size": "80x190", "price": 4500, "status": 41, "sku": 3343722},
  {"quantity": 1, "name": "PS55 USMA", "size": "90x200", "price": 5000, "status": 11, "sku": 3343732},
  {"quantity": 1, "name": "GF100 FISKELVA", "size": "90x200", "price": 8800, "status": 41, "sku": 3351932},
  {"quantity": 1, "name": "GF100 FISKELVA", "size": "140x200", "price": 14000, "status": 41, "sku": 3351957},
  {"quantity": 2, "name": "GS110 KATLA", "size": "90x200", "price": 10800, "status": 41, "sku": 3362932},
  {"quantity": 2, "name": "GS110 KATLA", "size": "140x200", "price": 17200, "status": 41, "sku": 3362957},
  {"quantity": 2, "name": "GS110 KATLA", "size": "160x200", "price": 19600, "status": 11, "sku": 3362978},
  {"quantity": 2, "name": "GS25 EIDA", "size": "90x200", "price": 6400, "status": 11, "sku": 3373032},
  {"quantity": 3, "name": "GS25 EIDA", "size": "160x200", "price": 11600, "status": 11, "sku": 3373078},
  {"quantity": 1, "name": "GS100 DOMMA", "size": "160x200", "price": 22500, "status": 41, "sku": 3373178},
  {"quantity": 1, "name": "GS60 SAMA", "size": "90x200", "price": 10000, "status": 41, "sku": 3373532},
  {"quantity": 1, "name": "SAMA GS60", "size": "140x200", "price": 16000, "status": 41, "sku": 3373557},
  {"quantity": 2, "name": "SAMA GS60", "size": "160x200", "price": 18000, "status": 41, "sku": 3373578},
  {"quantity": 1, "name": "SENDA GF95", "size": "120x200", "price": 15000, "status": 41, "sku": 3375146},
  {"quantity": 1, "name": "SENDA GF95", "size": "180x200", "price": 20000, "status": 41, "sku": 3375181},
  {"quantity": 1, "name": "KVITA GF85", "size": "80x200", "price": 7000, "status": 41, "sku": 3379023},
  {"quantity": 1, "name": "KVITA GF85", "size": "90x200", "price": 8000, "status": 11, "sku": 3379032},
  {"quantity": 1, "name": "KVITA GF85", "size": "120x200", "price": 12000, "status": 41, "sku": 3379046},
  {"quantity": 3, "name": "KVITA GF85", "size": "160x200", "price": 14000, "status": 11, "sku": 3379078},
  {"quantity": 1, "name": "EIMA GS45", "size": "90x200", "price": 9000, "status": 11, "sku": 3380932},
  {"quantity": 2, "name": "EIMA GS45", "size": "160x200", "price": 16000, "status": 12, "sku": 3380978}
]


