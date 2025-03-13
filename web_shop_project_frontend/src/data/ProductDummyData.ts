import { Product } from '@/types/ProductType';
import { v4 as uuidv4 } from 'uuid';

export const products: Product[] = Array.from({ length: 2000 }, (_, i) => ({
  id: uuidv4(),
  name: `Produkt ${i + 1}`,
  description: 'HIER KÖNNTE IHRE WERBUNG STEHEN',
  image:
    'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxMTEhUTExIWFhUWFxcaGBcYGRcYGhYXGhcXFxcXGBoYHSggHRolGxcXITEhJSkrLi4uFx8zODMtNygtLisBCgoKDg0OGxAQGy0lICUtLS0tLS0tLS0rLy0vLS0tLS0tLS0tLS0tLS0tLS0tLy0tLS8tLS0tLS0tLS0tLS0tLf/AABEIALcBEwMBIgACEQEDEQH/xAAcAAACAgMBAQAAAAAAAAAAAAAFBgMEAAIHAQj/xABAEAACAQIEBAQCCAQFBAIDAAABAhEAAwQSITEFBkFREyJhcTKBFCNCUpGhscEH0eHwFWJygvEzQ5Kik7IkU4P/xAAZAQACAwEAAAAAAAAAAAAAAAACAwABBAX/xAAqEQACAgICAgIBAwQDAAAAAAAAAQIRAyESMQRBIlETMmFxQpGh0RSx8P/aAAwDAQACEQMRAD8AWQ9a4gZhA27VSsOw3q7bedqxm0XcZwIkkrHtQy9gLidGHtTfjcatoSRLdh+c1Ww3HLTtlYRvqdqYpyMzlibqxcscRvJs59jXVOW+DO+BzXMrPiAco+6v3jVfl21wx81u4ylyPMCIPstMZvgkFAFt21yomwjux+VLyT5KqMWfLyXFM5rjHXC3TbslnZTqOh7xRCxxqzcA1ynsdKJ3kw2HZr9y4r3mMKgU6d/cUs3cDhnPiZQJn7UAmdgo21q4xdfMvD5LxqntDLbUEeU1gtTvSfdx7WUIRcswUIfN7yDXuB5pxAicrKDrpEio8f0zbDyoy9Dl/hoYbUI4jygr6qMjflRnAcy2GTOwKKPtHaaO4HFW7oBVlYH1oPlE0rjM5HjuAX7W6kr3FVcMwU6712+9hFI0igXE+V7F3UpB7rpTFn+xbwfQjYW2Gq7csBRVjG8o3retpsw7bGh6oU/6oYH1p0ZKXQpwceyte1MAVDeslRtrROziredEiMzAT7mJp+4XxTh1nE/R3w8XFjLceCGJAOk+9GgW6OfcL5Uxl8ZkskL95vKI796bOXP4d2br5bl7Ow+IJoB866FxXGMyFQsAjTLtSvwG82FvmdjRUkLbbGfhfI+Ds/DYUkdWEn86PphVUQqgD0AFWsDdW4gZajvHWKIGhW5l4qbI8p1rTgSi+hb7XY0I5vsnxZO1GOVVyrM1CqIrlhkcDbWuY/xRtDx1YdRrXWeLYkPcCbNH41yf+IWEZbutVLouPYu8N4qfCaw5ld1noe1UsPi2tXA6HKR+dRXbNQmaCw6Oo4HiC37S3R8SjzDrNVeMcYe7kQjySNO1JXAuLth7gO69R6V0RsDaxCLcQwsSSO/YetGnYLQBbCDz54yzKe/alDiruXOYR2HaugcE4L497I5i2swPnpS7zrhQt9vQx71GiJistujeA4gBb8M7nY9flQa7cnQUx8p8ILOLjjb4R+9Ci2WbPKuLYBtBOsE61ldWwjjIuYaxXlHxQvkzkni0V5e4XcxF0IhjqT2FUfo9Nn8PbuS852AUE+wOtc825pOONtAXnLk04dTcNwsD8eg69RSYvCMzW1W/bhwTJMBY6N610D+KPMguRZR1adTBmB0B9a5uyZtAdatN26OXjT2bXcLllluDyncbz3FFuDccZ3tpdcmXCxrHpoKXjZuAx3/CvMG2Vp1DAgiN5FMrXdjHC1Q4c42Dbe5H2SApXoDuTOvpSoRpqY/nV7iHErt2PEho30gn3q1jcMptyoOqgj96DnSVgY48FUijw+2bp19p9RtVu9aVCLTaA7nvOwrbgOHOY9gZ/Ks4Zw25ib5JmFaWPQa6ChtNtfQxUe28E6sV3UeYruCOkij+C41h3IT6GyECJtEzpuYotc4aS66hE0md3gaD2qocP9HuriFdSVOo2BB0IoVmcC4z4y30X8HiLLGLWLe233LojX502YXhOKa2HUow7zAPSvLmCwuIUG4iGRM7eu9MuAfD2MMtpWUKo8qgzvrqaOWWLXSs055vEtSE7F27lpyjoC3+QzVO5fw94FHiRoQwgip+ZsFavMGshmvmRlFwgyBJYwdBFJXCOZx45XEqBbIghRJDbTNVihzV9fwLwedObqSssca5LJl8M0ntP6VZHCDjMOBdGXGWhr0LqNiO5o/guX8PfOfDY4qOqEwfaKg4213C5c5zsPhuL+9aIxku3aHylB+qYH4NzhiMGwtYpS9obN9pR60/YS/hcYue26mR3E0hW+OJi2CXbMSYLxpPrVTjXK1zDkXcHcInUqDTExTR1rgZewchMrOnpTKpDx3rkHL3MN5LM4wtZA+FnHmuHslv4m94jXeoMb/Ex1EWEJP330/BFP70VoW5JDtzraGw370P5RvFZDVzHiXN2NvGWvsPRYWP/ETQS7jbx1N64fd2/nU5Irkdu5mMOt0HVe39KS+a+ILeCm4Ndp7UgfTbv/7rg9nb+db2uOYlNFxFyOzNnH4PIqWWmX7+A0kaih93DUQw3Mzf9yxZueqg2WP/AMfl/wDWr6XsJf0DNYc9LolD6eIg0+aih4/QXIV7lmi3AONtZBtMT4bEH2NWOK8HuWYLp5W+FxDIw7qw0P40Fu2ql0X2ddwLq0PbIykCT60qc38Pe66WUQtcJOo6z3NBOB8xPYttaiVYyD1Bp2wt66LFu8rA3NydNu1MTtA1Qv4PlHwf+rrc7dBTfwThGXU1H/iIvLnaFcfFPX1qLEc3WLYgHMQKlUV2Na2xFe1y+9ztfLErEHb2rKqycWYlonaosfxFkCi0SBO/3j2PpIq+iZHysNqW+PYn658ylF+zpoYHSK5jUn0F53NpRXXsKcx4e1dtW3ItjEuHdza+GBssfej9KSLphuoFFuC3WbEWyBIDgkD7vX8qZOJcpK5uXMwt2/MUJ6x0ijU3F/Ixqf49SYlrcAYSZX9qt8Lwhu3yLckhWI7n0ofi0CnKpmNJ703ch8GdbwvuQqhfLqJM9xTJpKN/sasWPm0CAls3TnlCAR/u7GmThQt3MJ4cDxBcJ+W0e1N2LwGHuW3U5MzbkASfnQfhuGs2SfBVgdcwbcVjk9E8jx3BXZT4NwgKrFh1IqYOmEssxEa/iTRO0JdddzrQvnazZdVR7wtwc3eflUx/JmXHtgwcSe82rdJWKg4i7yofVZ2HWhq8Yt2XUWZZBuzbk+3QUTs8csOfOpk0bhK7a0a8eJzlvo6lw3h2Eu4G3mu5LmXNmDCe8QdDppSW/E3t2z4Z+LRhpQzFYoPa8O2+UTI02NBw+KVgcy3AOkbigni/I09Ki8vjSk2+yJuJ3Ldx2RmRiCCB296F4bV0/wBQP50y828JCpauouVbiBmTNJRus0r27+WD1BH5Vvw/ooViR2y7wDD3VUlMrQPMvlIMdxQvi3KWJZYt4tiBsrw0fPelnBc8XBAanC3zKbdkXrywHE2rcw13/Ofu2/XdunekRU7o6c5wStihd5OxanPfxC27QIlzoPZVGrN6D8qkvcwCxKYbMW28a75nPqi/Bb/NvWqfGuP3cQ5e43sBoqjso6Cg928DtT06OdPK5aWkS3rzOxd2LMTqSSSfcnWiGC5dxF0B1QBW2LELPbTfXppUPL2HR7hLjMEE5ZgEzAzHfL3jU6Ab038TxtwsfDkWwzKAoCiFzW9twChMbe00vLmWNWZMuX8evYHwXKMuDcuKyjVlSZbWFUE7ZiIkj9DDF/hdm2pVbVoZXL6g5gdSEmCZECBp7AEymYPiS2TezBs5fNm1MNImANF11n2+ZLgHFVxMhlKRmlgx2CGARt+kSKyZ8mWS+OkIyPJLfoo803bJyg2fMFJzKQvxeZJ07sSQdfbWoLPJbsCxvJlAJJCvp0B0BGXYzO1DuMXnF+GIYwGYaakmTr31FOHGuJk2layBlyiYyqZMmGUT5onSTp+bY5MkIJff2M5zhFJexFx/CLlpc5KkCJyknLOkmQNJ0ojy7j1VgzW1uwDlViQM32T5SPw2q4+KLqFYFoJAAOgLa5YA3E6nWfSgeIwz27jFQSM3TcSAdQNt62YMrepGnHNy0+xkwHMTi9lv2xbW6fgImyZPwFSSI7GZHfrUnHOUGYm5hJy/atEybc7Mrfat+p1HXvWcFdboyMJ9CO2/zp44faKKIOw09uoPcenWtfFNB8mmczfk/F9UiiPDsPjMKpD2TctkfZMx60+cf5hGFto72ybTEqCPsN1RvT7p7abik7iXPCXARZJX0I3pVJDexY4jjczRDIexMVUvWY3bN7VX4vczNPehwYjYmqssIFz3NZVQXnrKoh2vmfhP/dt6jqOo/pS1fwqXUNt9RII6EfOi/KHM4ujwrsC5HycelE8Zy2G+tskHuvUfzFY5RaejauMlvo5lxG2+GaULRqCY3BofjuYLlzRmMDoNtorpGLwMCHUGhGL5StuJAAJ7VSlH+pCJeFBu0c2e5JmKtWsTcGzH8aZ7vJ7g6bVWflu4D8NM/JEJYZIGWOKXl1DmjOG5ldlNtiASPi/aaqvwi4BqhqB8EdippcuMlRJY5NUwkxy6549S1AuLYp77gnUKIBqe5gx61JYwpqscYw2BDBTBVvDntV+xZA3okmCE6Cp7uHVR5vwq5ZLHrHRWw6dquZGHWqLY4L2A7CtL3G1Gyz67VShJhXFF2/bFwZXY/KoBwVBqGn3qgeMT0Ao/yzbBBxd8A2UMIh/792Ph/wBC6Fj6gddDUJC5ThFWwlwzhdrDW1xOIUM7CbNk7EdL1wfc7L9r2oHxjiL3nLuxZjuf7/Snblnly9xFmxd1pQXDAYaXCFkg6QFGgETqCI0pmwvIGEy2syK7Kpkr5QwVpLNJOsjKWM6NAiJouSWjmZMznK2jhWIZtNDDaA9CRvBqfC8KvuJCMQNTAmO2pgfnXduM4K2louihGHhLbyhRktTqUQAnKWg6Kc0LoRXP+F8XHiXLBRrrO/kDFfMFMsXOjFiF6zPpOshmTdCnnfSQK5NsvaxJR/J4iEAsCq+pYnYBfE12mj/GUtq3hI8gjWCBGuWPMRO+w37Ut8Y4VcF/PbfKQbTO6uzi0XhUm4V1kDMcsgBtAYo7w7gT3bSXmfxGk3ZGYEIJF0PmAAOjbiDGnWs3l4VNqbfRnzrk1Mh43wD6k3FEZ/Lpsff8jWn8OOGgDFPdIVQmRS23iQxgHvAH4jvT1yTw8XbGKwxdbiKUa2ygBVzLqoAA1BXt69aJcT5WCYUWLaF7hYuTIVVL5Zk9tB+FLhGf4247Vf8AkFFScNdHGsLwJ8VjCqPlVYNxzslsKJPv0A6mmjjd6yiABfDw6ABerXCogExqZgfhTWmGs4LD3LQXxHYM114PmMaBZ6A6AfzNc54twzE3nzXTkVh5UALQO0j5VV3Sb0iN20m9IEpxlWa5pB1ZToNiNx0+VbWTKZ2BksSNDopGpUTq3XX3mrX+EW7S5XMDfUSWI6GDPWjD2ba4W2QTnYkrIC6QwBOxP2h10303dGcW/imE3FbRR4Pda05ghc0jzDTMQpVhH2TJke3eujWwCqkRsJA6Vy+4CAk6mYKt3zMCDO8qQK6HypiFdQjeUgACdj213murik3HZpi7VlrjXDFv2HtEaXFgejjVCPWdP91cYsYOAwjzhipHYgwa+gsdYy25GkbR0I2rh/OiNZx1x7RgXIeOnm6R7AVMi9jsf0AHw7EnSpLfDdQD1qK7xK8TsB7Cqz8Ru7TSxg/YPhWHCKDB0r2uefT7n3jWUVg0MC2SGDKxDAyCO9dT5G5mF2LdwhLw+Qcdx6+lc+w1tAJNb3LcmUlSNQevvSWrNMXR2/F8HS8CUhX3IOxP7UvYjAtbMMuX9D86Acvc9lQLeKmRoLoH/wBv50T4jzkNfrLdxI111FInFPsdCT9F1bax0qK7ZXeNKAnmnC3PgORux0H41BjOOAbtoOxFLliY1ZEH72DSNhQrFYWyN8vtuaBXebcP18Rvyobf5t1+rtKPViT+W1CsTI8sQ/et2uiae1DcS9tdwB7kUucQ5huP8dz/AGrCj8qDXsYW7mmxwtipZkM+J4sg+CB60AxfEpOhJNUDmbepbdinRxRiJlkcjQlm3NSW8LO9SgRU+Gss7ADckAepJgUYBb4LwRr9xbdtdSQCxHlQExnc9FG/yrtPL3Lb3PEttZK4VUt2bSMFIdAWL3WjZpM7z5jpotEMdwqxw3C2kS0uuXOY1e4Bq7EQSdT10mhzcSv3ABaxlsA/YIZD/wCRn9ayTyXJwfX+TBmzcpca0hoa4uGw6YW01oOgyoCwhFkhZzGZynU771UGPsW0yHFW7lyPPdeW0mcsD4hOwn8RpSPxThuJu3C1z4z1BR5jSYV5qLDcm33YZlvMJ7C0o9SWJ0HtWaWTI5PX7e3/ANe/szucm+hvv49Lll2w5zgsVN64CytcBXM7bAqqk6DTf7ppC5odrTYe4ioHtBmAt/C0kgXFUQJMkljI0HtTbwvgVrw3wwNrIswqM7Es2jNLiS32fKIhm26pvNeH8G6LRP1eREhSDEDUOToCzAkgEfGNJosTjKWhXbsr8Y4wj4dblsC18IZC2ZGKKuWesToFVfsrqKJ8u8Ysoq2oLWvDIvL0uJmzM+YQylSSwmN4jzac+4wWRkAMwPKJ216Tt3+dZhsSw3HkgAmG+E66RPQfn6VpeN8aQz8T42j6JbjmDwajwULZ1RoQAZgVGUsT1yxvVLiXMbX4W2Cin4gdzSLwrihxFsOR5wozDuuy3FHboex9xTHhXEowElT+PpWH/kZbalpfX7C3mn09L6LXEroSz54VAMzE7ACkXj/MCXgvh3MoYHQBgSo0nNGlM/NnEMLdVrJvso2bLqpO+We/t2pBv4TC27aNbuve0yoMhAUZvMzMY9YAGse9PcUwqT7A+PwYQ/8AUuQemckH1mau/TIs28xzEBsqmNwCQYOh16mZn1qvjLsAq0znaBGoJJ0rEwDeH4jeWB1g5VB7d+tHCXTkO7Ss2GMdrguADecpkgQQCB0I394rpnJWOtYi3ICpdT4rcmSOhAI1BFctupJMMZBK7GIMtJAAAMONvXSrXDOLNaZLkgBbnlb7pGoMloA31PQmulF10aUtHceNYkC18q5Fz1al7LfetnX2On5U88W4vZxFkXbTOsFkKkGJy+IAQdOm/Y0mfxOJtnDIBL+EQOuuaJ/IUcug8epCLjbsHKurGtbeDgSd+v8AIURw/DMgzOZY7+npVfEtPoKTY+igbdeVPNZVlUMdu8BA696uW/NvVGwo6/8ANXhcDCIgUDDRYgQQBJ70KxXDlY+WVbuP3oph0LaKNKg4nxa1Y8ijxLp2A1APrHX0qItsC4zB3sOM5ZCOk6H+tCPpxOpQmj68KuXnDX2lj9idEH+b+VHvoFpE1UQB/ZqcUVcn7OfPiydkrVs7bmPanG1wdbhJyitF5dBeAM0eZwrKsICAYLaA6jvuKmkSSaVtikmGHWiFzg91dDaeddMrH4ZzdOka9qff8G8A5LaCFhS2jlroVibgzaGGaFGmy9TpInFAyvdCZAPqj5QVJZTmZkkAyGQnoSJ7Vln5aUmkrowvzFdRjZzr6KwJBUgjcEEEe4OtSCx704YzEAhWui3dzliSy+G0zJc5IbUkxrELtWcT4fbSPCkA75oOWNIzCJMgmI0BG9MhnjN17H4/IjPT0xUXCEHUT6U3fw44QLvELCmPK/iH/wDn5gB6yB+dCxbA2H8zWYbHvYuq9pirqfKV3BIj9CacaKtHbP4itbbIjEzqRSNYwoU+VvxNbcVxrNhsHiLuZ7l0OHaZOZbrKCRttAgdPzvYThQuIxUnMAMusgGRIYgH7Mx6gVy8jccztd/6ORkXHI7B+NxGIVBltZonUGfyobw/nW/aaQ5WdNQCtMx4ZctwwOZDGonSRMEHYwaWuaeAufPa0c65Y0ueno3rV1btFqh04RzFevWzF1W0+sVFVLyqCBmBYhWUkjrrrHalTn4wUHjB83nM22UqwOgYMT6GBA0mIqj/AA94h4F4O4KhgQy7kLqHJXeBAb5VV535pN57im2FZGjONyF8oXpAOpI2mKavl/KAnvS7FPjt8M9sfFlDDTqNIAj9fyq3hOB33PkskgpIPYQSWbXt8tfWtOA4dLuIUuCVAOkaZgZEmOonSupcn4IYk3QsIQhUNJCsCRIhT5o09pHejzZZKShFW6CnNqoLujlv0PEIC6eIhtAhjJGWMuZfNHUkZfy60VwfM2Ju2iiucw0IRYZi0KFEa9aauM8PtmzeW3auOlnPLkkLJYAMPLqwJzaSPKZEVZ4Thhh0FmxaK3HGbQ6hiRqMwJ07Qdu+lKllUo21v0KlkTW0IWKd7RKXrZRlMlWOssukg/2J9Kg4lw7ErbS5kZbZACyNuxjcCZ3p/wCOWlPiJiVzPmnOuWRcA+8BoxEDXsO4q1i7bta186xBzRm/0tGhNUsqjtouORLbE3lXly7fuSVbr58sgGCQImdY3NScxcPuWY8VmcsWAUADKFMEmQRI7evtTpy9y5hfAGIa89oE+QB/LP2cykEkT9nsKReYMW1xyXuOzSAXnc5YJHQSNJ9R3mn48TlJSZoStgp182qz1nSY2zGdAR6dm00qtDqwysFZSBoSZE6AjoJyjXXap8RpmBIJA0J7Egkx2E9zoD6ihl5xpoJ2M/a2A67zW1j0dQ/hnfzrftZBo1hwSZ0OcT118oH+4+tVP4iXF+lKeqW4B7AnYesAVb/htgDh8MbtzRrplZ+6Jyn55mPsy9qXObcV4mJuHoIH4DX8yaN6gMxr5ADFXSfboKoPJ3q3cBO1R3Fy0oeyvlryvTdNZVg6DFnuf+avKgjO7BUHehl7HJZEt5n6KOnvVZbN3EMGukqn2V/kP3qqJZbvcUuXmNrDAqvV+sevYUS4Xwy3aGnmuHdyNvbtUuAwyquVQFXsNzV5iqjTT+/1qWGo/Z5hwtsa6+p3JqtiMYXbaVHTpUdxi5gfh/OivDMAAuZjJ7dBQ2NqlslwHDXuwqzL9Buf6Uz8H4bZtF7KlQ8ZHdn8xbUMuXKYTK0zIJ8ug1qtw20wUug87HIpzhDBVs4QzIb4FzdAxI2kS4m7gnS5bNm2JcgOrsXJkiWJg5o3maz+RkcVS9nM8vLKT4R69ljm7jeHRUw5tss6aCJIjVTMAHTXSqCcOtXUldDnDEHWWC5Zbvp+lVMHg7hzWibdyydVdCVuIemjEyfatbGAxGFvl8xvYZz8RjPb9HAG09ayqD7YhQBV3CRjLlo25Z0DoSdCm3yOkx61NxXBqtwjOAGYll9gAD6DfT1mm7inDFvXLeIT47X4MpiR+Q/ClPmbhRTE5yYS75h08wUAgn5de9HCKU7Dx6mmCcREeQQO561thOGnfYHr1Pp6CiVrDL7/AKD2r29cgbwBvPbqSe1dE6bZa4hZFzhbopOfDXc4jolwdP8Aev8A7Vrynj1xHhqWfNBGygrG0n1HYT+tC+XuPg4rwlt5sO6tbvt2tvpnE9VaGHU5aoi0/D8eEZoRbwzEBYI0hwWBygiDm3Ak71i8vx1kpnP8nDydnWOBLdOICMHuI+YOWGgXKcuXfQGNZ+0aj5p4PCCD5gWImYyrJliNtOtFjxoLaLBlXxZWyqyzMQCcxJ/l1pRvcfu3Ga06gsMssTCImYyzMWAJJgAa79xBzRlFR4dsQtRBGPvXbVphcZVW4MvjZZKqdCjFT5pkajppHWkVeE55uXFJQ6bjPAEZvUadSKK81cyByiCB4TarAyiARlnUuQe8jbSp+EYwpYtJZ+IL5guUlixza5QRp3JnWIpr5Qg5oXNuMeSD3KnC7NpLd++BlGlm3lEEjy+I89BqAD1k9BXS72Ft3UEFj5cqRuQSJPtPyrmnAOKS5tYm2hskw2VxKP0aAdOsj9a6FwTmLAW7ZW1etnIIOozegI3oMD2+bVf5Bx9vk1QG4rhrVq8n0jEXSQIlcqnIDIUx9n2HSheK5pwiC4tuFKyis1y67uW1gMVMKNzp+FZzJxO1fPiTJLKvsD5R+dJPHOMFAbTDXoYkEbaH9qBbbpd/3Fq22kv9hDmW+VLE3lZsqwFIOZjlYDcln6bmfWvMHxkr5QDLaBZEyCcp7Rqum3mHtSphishyqmDIkkKTvEj2onhbJdsioRA0gFsjZSGgnzA7tpJ6aRNaksco8ZdDuMaplkY+1atXA6NcZ7mYQSQEK/EFPSfmSCNN6Erfz7KFkEgDSRAG3T7Ma9OlFsZhPFUBSFdQVAEQ0aQZ1gCQPSKXPrrTFXtQYgsPQ6RA+daITjH4o046o9v3Tk66GNdP82noBp8qt8rcHOLxCof+mozXG28oMxp1MR7SelDbNl7rqiAs5JA9S2vy+0TOwJrqXDsAuCseApBuHzXmH3vuD/KO39a0QXIai3xPGqoJEBVXT2A7VzBmZ2LHqST8zNM3H8TKFAdSQI9Nyf0Hz9KXblwAQu9FldujRiVK2Q3iF96oXZNT3JqBqWGyLIKytSwryoCTYHBQczeZvXYH50esCNSdf72qlZhRrp6Vd4Xb8a4qCQCfMRrC9fn0+dQtUkFOHo9xgqLOqieiyYlj/Z0q/c4Qpum21ySGyu+a2iI0TAzNJAGs6HWImax8WtkKtpcloMHZnUMSy3CggM0sYJjYeUGBtQI4ZldHZrjDMSrMTEkrOU9wSZPdaXlfGNmWfkS/o0ON7kshvq7oCiJzCDOXMR5Sw6R/waD8QD2WyMNunQdZB7UVwuLZyrW1ZiZzJrqNgYGsbdetWuL4gKwGLtpdWVkoBsv/AGw0AqR1Glc7H5slL5rX7Eh5U+pgflrHKMQpYxbYFTPQaNK+5UCJEzRPE8Ltrc/6bCTtG8+/TXeg+LFm25ZBvIVWGbQyNmBGx3inLgmLtYvDkXrsXrYAAJygooVZZjObXv3NN8vHKSWSHr7Jnhb5oTuO8VuWLgVbByrqGAOXqBqND7UT4PzoAyi9aUA6EgxA9QDQvmTi7eHkS2wtsGTMZhtwYmIO+vZaUlurDkJoiqSBuc2wE+gJ+VBjbmroUqZ3HDmzcvZMOXIgEkaqAag5h4emSLptnL5kDkDWI0rn/I/PyWC1sSAyeXMIhwDlE9p6VQ4hjbl1i1x2Zj31/KiyXFVW2C4NBLE422ilj5YOpkmNPn6Rr1oApvY9yqfV2AfM3fXb1PpsOtCuKuGuKCSUVRmAO7SZHoYiaYMHzSqKFW2EUCAANPlWnDqCN+GPxVhcWEw9rw7SgDqd2Y9z3NF+Z+W2xGBw15CXvLa8yxrctiSMvdrYIkdVilN+NJc0HX+/wp+4NxMtwsgNlfD3lyOPxH/qWEdgKfGN6CzK0cjTG3kXJ4hhdQp1B7jXppqKkw/HLlws9+4rhYLI7FWuqD8CnUGOikdTFPPH+W7eNTx7BW3iCPrE+G2zzBgnRGJIjo2uxrmHEsBcsuUuIyMN1YQR/fel/jje0ZeK9onuqAqNctXAXJKkMpRrZ3Gg+IE/tFGuG41LKvqwVlOVRBhu8TA03PSPWlXDgllXpI6x76nQe9NX0hEsl2BDkAJBEFszg7gmMmVp03HpS80foTmS6QY5cwVu+zQsog2MMCQNBE7Zip7mQdlNNvLfBsLYvhGtFzcBt5ZBAQhWZh1EMpA9hGxgDypfFrBwsG6QbkBnGklhopEmARMEToTETEcTdtm5fDlVuo5WSEJbw3AK7S588gAwW3nWs346lUWZGny0y/isFnxH0QjJcJhCYi4M3lDEbNsQevzqnf4HczmzdTxED5cwiPiyghtg06e9UcIuIxBFzMHuyTmEZlKgFSYO0xsO+tOPCLf/AOKBefxbt11d2UIArqv1mUjyrlUKC+mus6zSFC/5QtL+4t4rhmHw1wBLIOtsrLZszBk1YTrmBZTK6GIEGjtkqwtqB4cAeUqCYEKxLaAnQawN/nVBvDi2iXCJJdy3myMFhREnUKsDXWR3msN42rN26BmFrQLIhkdTDA66GVEa+sUbyuTonKUnQkY/GtZuoWnKcwbuDm1nU6/1otdspeTLGdjEATJn4YjXWqOEwRxTBbI8QvLNJMAkksXMaDf8Kb8CbGAQC2RdvgZfF3W2N8iTvHf/AIrbHH+R6VfudJRPeD8BtcPTOVH0lxtObwlOup7/AN7bjeI8SgGTqaq8S4sSSxaSdSdyT6mgF3GSZPyFdDUI0h0Y2y7i7ucyRG2nsNz771RvAVFdxvbeqxv9SZNJNGkb3tfSqlxY61I1+oXvVAWyM26ytTdrKhRfKlhOYE+najfBfLZZviYtlABYSAJgldMoYhjodhM6Cl63cDaZYX06+9HwQllAoGVs5cj4w0ZkEjbygNqTIUbdaQOZ/Es4nHbgs0AJm+ELlEy0FgJLZhrJOU7dKGGxwvMBLeWABIywDqdz3OiiPzoVgrRLqTouffLIgnXYbamjlrhvgHOv1mh0AgxErv0Onpr6VnzTTVGVxQ44Xj9y3KIWbygEnXySCIB2g66a1U4hxS89tnK5k0kTGWSIYR+E9JNB+FcQAPnzWm1JOWVM669QJ7U24G6hBMqZGuWDIPcdaxOEYyTfor9L2hRtsCQSJPWdIHpV3A41kdXtMVKka9z29u/SiuN5Ytuc1u5kB1yfZ/DcVXvYPwCqsykkHRTsOnTSf2resil0bYZIT0XuYDYxSXb4QWrqiSDH1hymSDI2JYxvovseZY3FoiwCpIEFSN9TBnruaccRdkHUkdT3Hp6frSTxexZzZbSnxCdt4/r6dBvQQ8dJ2K/Ak7QMtnqavpxG8d7rAdtiR6ka16/BLiiWie3aoPo7DpT2kxvH7RurVPbtk1Jwvh1y6+S2hZvQbDuTsB6mui8A5HtpD4hgx3yD4Af83Vj6aD3q1FvotzUexY5b5YvYpvq1yoPiusDlHePvH0H5V1exwezaw4w6GEElmPxXGIhmJ9h8hUD44qMttIQaTEKo67foBSTx/mhBKqTdYSJmEGvpqf72p0UoipOUxvOJwliYvJsJBBP45N9O4mqHEcbg8UBbY27ihSAGRxBjQo4KlBAPw6a7VyzGcRuXPiY/6V8oHyH71FaxwVGXIM5YMt0SrpAOgI+yZEj0oHKLd0WoNIO8V5ZwwGZXvWZ6wuItiZ0zplcfNTvQ1eAYnLFh7WIBUrFt1zhSZP1dyHBPoK1PFma15sQ+cT5cogjp5hrt3qkmJEg7d+tR0VwvskL4nCyGW9a7BlZB0EwwAJ0B/wBo7Ub4fxNcUUthYuEZILFUeMzBiw1Gp2O5A3nTXCcwXVELeuAdg7R/4nSpH5iughptMRBl7NkkEGZnLM0mWOL37AlgsgxFq5YLNnlQ0ESBLLEwWWDH7juJKtxC5dw4GfLb2PwkgEqSFA2BKgx6etD8fzLcuj6xLFz1a0hO8n86FPxJtYCLoBCooAAMiBFJfjya72JfisbMDh/rgiEFygJzT5vLmYEmDIObfefnVy/jbX0dbbXfMfK6rlzZQZAnUCZaSZjoBOiC2PcyPEMNvrvWqYuBVrxVyTfouPjJO2N3+KBLfhWFFtOoXc7CWY6sdKEYrG5RqaD3OI6aHWdv39qqX8SWJPwgxoCenvvWxOjQok+Jx5Y+lQNiTVcmtSap7D6JzfrzxagmszVCEpu1qXqJmrQvUKJC1ZUU1lQgSJjtRBcVmt28oH1bNK5iM0r2A0mPfQ60LS8T01rayWEwQMwIOx0O4g1VFT+SoIWLvhgs7mAfhEDXt3/4oha5jUhcxaF0WIgAklgJmNTP40ttgSRObbvUJQigWNLsFQOgYbmOyd0Dg99D/I1Fe4thydA1o9unyIpEDEbVKXJ0JpcsEGT8UWOmI5gNpAc8/dE70GbjTuxZiJY6+1AcorXMToNutXDEo7LhBRDOM4s9w5LfXSfTr8vX8KI8JtW7OvxP1b+9hS/ZbIIXfqaYuWuXMRijKjLb63H0X1gbsfb8aZV6Q1NLbLly94n97/zph4NyO97W7NpN9fjaOkfZ+evp1pg4NwrC4MZh9ZdH223H+kbL+vrUPFOZAMxzCOpJgDtJpscf2BLK30EbdixhECWkCgdtZO0nqT670M4zxa1aB8Z4aJWynxtP3/u/PvSnjOZmY/V+UffPxH/SD8I9Tr7UKVZ1mSdSf6neickio477LHG+PXr/AJfgt9LanTf7R60EOHNFTb/GvLtrNoDHrSW77HKNdAK7aNUyDRy5Z3n+pqu2HzHaB+tQpoDkV4ooz9AB66Cql3DR2qyqKLOw+ExXoxzDdQeh1Ov571aazA9aq3rMCTt/elQFni4vTY+86fpUbYo1oZPt0rQirKJPHatgTUQqRahCVRVhMFcZQwRipmCBO2+1XuW+Hpeds7CFHw66nWCT0E0SYC0jhTKoN0PqSQZ6+Y996TPLTpdgSnWkALOBJBk5TIAB01039NahxuFa2YOx2Pf++1My+J4RuEFS4I33nQT+FVBigxK3Ig7E9WJ6xt8R796kMjk6YpZXexbrJqa/hyjFTuOxB/MVEVpxoNCa1r0itahDKysrKhQQy9z8q3Qdo/v1rCfQRWxPpUsKifxepWe4qRntsB5YPXTUfhVVX1qz5I2q7Ikyndw3VelQXkK71cxOLVR69unzqpbss5BaSTso3PyoSyDVvarnD8HcusEtIWPpsPUnYUd4fy0TBvHKvRAfMfc9KPpiLVhMqAKOkD9e596JQ+xbn9GcC5Vs2Ye/F1xrl/7YPaPtH309KYMTzCqiAwAGw6+wA2pJ4px3MCFbTudhQC5xF/smD1bqfbt+tHaXQNN9jXxfmUL3nooOv+4/Z/WlbFcUe40sdBso2X2Hf13oe1aCluVjEqC1vEzRHD4jbX5Cl62TVq05PXShGJjCl6RA2/esFyNYoauMgenT+tYb+bUkx27+/pVBWX7pzazp+voPSvChjaoxfGnQdK0xOKbL5f7PerIaYhgNZj0rVUDCQQf296p/Q2Jl2n8z/Sp3vrbX9h3qwWzzGOqCT1/E+gobbtm4c7aKNh39B6frXgm62Z9ug/YenrV8XAO3zG3tFWD2Ur6+lVTaq9cE7D85rRkqFMp+HXlSXDUJNQoL8vYJ7t0BQcv2yPu75Z9YHrXQ+FcsKEhzmJYsVA0LEzr6DtS/yljJtZUOUAagAaEb6+tMCcVQWndW8QpuiuoPtvv6UhyuVUZ5SbdHvHcAoyq9xLS9zqR7D96Hf4RbNtfMjqitNwQoKjaToC05hprECqvDuOpiywuWAqgeUhQxJnUEn0996tcUxlsBVtPlZywCQqqFy7KABB1IzER+tZcv6uKQmcX0K/HbPnVuhXQ6yYJGs/Kg91KLcXxKOwyfCAI3mSBIMjv8qGvXQi7Rsx/pVlJxUZqzdWq7CrCNaysrKhQWc/jUZNZWVQZgqC9iI21NZWVCmXuE8Ga75yQB3Op+Q7+9MllbdgHIuvVj8R6b/wAqyspySSsQ226KF/mDWCuuuxoTiceznX8Og9+9eVlA2xiRXfXUmT+ntXkVlZQDDUrWBaysqEJraVubgG01lZVFmeJ3rbx/lWVlQlm4xela+MdyaysqEsx8WQCTVAuXMnb+9KysogGWvEgaVgbvXtZULMLVHcuGvayoQjyVGbNe1lUUS2lKgwxE6NBIBHrG9epgJ29xWVlQJIL2ePYhGklWHUREmAJJGswBQi7LsXcySf70r2soYxS2kDxS6Nq0Y1lZRlsic1XY1lZUKI5rKysqFH//2Q==',
  price: parseFloat((Math.random() * (100 - 10) + 10).toFixed(2)), // Zufälliger Preis zwischen 10 und 100 €
  onSale: Math.random() > 0.5, // 50% Wahrscheinlichkeit für Sale
}));
